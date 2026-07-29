import formidable from "formidable";
import fs from "fs";
import os from "os";

import { extractResumeText } from "../../lib/pdfParser";
import { analyzeResume } from "../../lib/claude";
import prisma from "../../lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  // Use /tmp on Vercel, ./uploads locally
  const uploadDir =
    process.env.VERCEL === "1"
      ? os.tmpdir()
      : "./uploads";

  if (
    process.env.VERCEL !== "1" &&
    !fs.existsSync(uploadDir)
  ) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    multiples: false,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("FORM ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to upload file.",
      });
    }

    try {
      const file = Array.isArray(files.resume)
        ? files.resume[0]
        : files.resume;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a PDF.",
        });
      }

      console.log("PDF Path:", file.filepath);

      // ==========================
      // Extract PDF Text
      // ==========================

      const resumeText = await extractResumeText(
        file.filepath
      );

      console.log("Resume text extracted.");

      // ==========================
      // AI Analysis
      // ==========================

      const result = await analyzeResume(resumeText);

      console.log("AI Result:");
      console.log(result);

      // ==========================
      // Save in Prisma Database
      // ==========================

      const savedAnalysis =
        await prisma.resumeAnalysis.create({
          data: {
            fileName:
              file.originalFilename || "Resume.pdf",

            score: Math.round(
              Number(result.score) || 0
            ),

            strengths:
              result.strengths || [],

            weaknesses:
              result.weaknesses || [],

            suggestions:
              result.suggestions || [],

            overallFeedback:
              result.overall_feedback ||
              result.overallFeedback ||
              "No feedback available.",
          },
        });

      console.log("Saved Successfully");

      return res.status(200).json({
        success: true,
        analysis: {
          id: savedAnalysis.id,

          score: Math.round(
            Number(result.score) || 0
          ),

          strengths:
            result.strengths || [],

          weaknesses:
            result.weaknesses || [],

          suggestions:
            result.suggestions || [],

          overall_feedback:
            result.overall_feedback ||
            result.overallFeedback,
        },
      });
    } catch (error) {
      console.error("========== ERROR ==========");
      console.error(error);
      console.error("===========================");

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
}
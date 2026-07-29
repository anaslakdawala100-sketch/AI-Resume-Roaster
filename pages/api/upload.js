import formidable from "formidable";
import fs from "fs";
import path from "path";
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

  // Upload directory
  const uploadDir =
    process.env.VERCEL === "1"
      ? os.tmpdir()
      : path.join(process.cwd(), "uploads");

  // Create uploads folder only locally
  if (process.env.VERCEL !== "1") {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("FORMIDABLE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Upload failed.",
      });
    }

    try {
      const file = Array.isArray(files.resume)
        ? files.resume[0]
        : files.resume;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: "No PDF uploaded.",
        });
      }

      console.log("PDF Path:", file.filepath);

      // Extract text
      const resumeText = await extractResumeText(file.filepath);

      if (!resumeText || resumeText.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Unable to extract text from PDF.",
        });
      }

      console.log("Resume text extracted.");

      // Analyze Resume
      const result = await analyzeResume(resumeText);

      console.log("AI Result:");
      console.log(result);

      // Save to Database
      const savedAnalysis = await prisma.resumeAnalysis.create({
        data: {
          fileName: file.originalFilename || "Resume.pdf",

          score: Math.round(Number(result.score) || 0),

          strengths: result.strengths || [],

          weaknesses: result.weaknesses || [],

          suggestions: result.suggestions || [],

          overallFeedback:
            result.overall_feedback ||
            result.overallFeedback ||
            "No feedback available.",
        },
      });

      console.log("Saved Successfully");

      // Delete uploaded file after processing
      try {
        if (fs.existsSync(file.filepath)) {
          fs.unlinkSync(file.filepath);
        }
      } catch (e) {
        console.log("Could not delete temp file.");
      }

      return res.status(200).json({
        success: true,
        analysis: {
          id: savedAnalysis.id,

          score: Math.round(Number(result.score) || 0),

          strengths: result.strengths || [],

          weaknesses: result.weaknesses || [],

          suggestions: result.suggestions || [],

          overall_feedback:
            result.overall_feedback ||
            result.overallFeedback,
        },
      });

    } catch (error) {

      console.error("==========================");
      console.error(error);
      console.error("==========================");

      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });

    }
  });
}
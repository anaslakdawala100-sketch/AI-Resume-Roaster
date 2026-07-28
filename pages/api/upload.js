import formidable from "formidable";
import fs from "fs";
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

  const uploadDir = "./uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    multiples: false,
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
      // Formidable v3 returns an array
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

      // Extract text from PDF
      const resumeText = await extractResumeText(file.filepath);

      console.log("Resume text extracted.");

      // Analyze using Groq
      const result = await analyzeResume(resumeText);

      console.log("AI Result:");
      console.log(result);

      // Save into database
      const savedAnalysis = await prisma.resumeAnalysis.create({
        data: {
          fileName: file.originalFilename || "Resume.pdf",
          score: Number(result.score) || 0,
          strengths: result.strengths || [],
          weaknesses: result.weaknesses || [],
          suggestions: result.suggestions || [],
          overallFeedback:
            result.overall_feedback || "No feedback available.",
        },
      });

      console.log("Saved to database.");

      return res.status(200).json({
        success: true,
        analysis: {
          ...result,
          id: savedAnalysis.id,
        },
      });

    } catch (error) {
      console.error("========== UPLOAD ERROR ==========");
      console.error(error);
      console.error("==================================");

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
}
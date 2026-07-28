module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/Downloads/FINALITICS/finlaticswebdev_project2-main/lib/pdfParser.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractResumeText",
    ()=>extractResumeText
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$2c$__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$node_modules$2f$pdf$2d$parse$29$__ = __turbopack_context__.i("[externals]/pdf-parse [external] (pdf-parse, cjs, [project]/Downloads/FINALITICS/finlaticswebdev_project2-main/node_modules/pdf-parse)");
;
;
async function extractResumeText(filePath) {
    const dataBuffer = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath);
    const data = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$2c$__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$node_modules$2f$pdf$2d$parse$29$__["default"])(dataBuffer);
    return data.text;
}
}),
"[project]/Downloads/FINALITICS/finlaticswebdev_project2-main/lib/claude.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeResume",
    ()=>analyzeResume
]);
const GROQ_API = "https://api.groq.com/openai/v1/chat/completions";
async function analyzeResume(resumeText) {
    try {
        const response = await fetch(GROQ_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `
You are an expert ATS Resume Reviewer.

Always return ONLY valid JSON.

Return this format:

{
  "score": number,
  "strengths": [
    "...",
    "...",
    "..."
  ],
  "weaknesses": [
    "...",
    "...",
    "..."
  ],
  "suggestions": [
    "...",
    "...",
    "..."
  ],
  "overall_feedback":"..."
}
            `
                    },
                    {
                        role: "user",
                        content: resumeText
                    }
                ],
                temperature: 0.3
            })
        });
        const data = await response.json();
        if (!data.choices || !data.choices.length) {
            throw new Error("No response received from Groq.");
        }
        let content = data.choices[0].message.content.trim();
        // Remove markdown code fences
        if (content.startsWith("```")) {
            content = content.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/, "").trim();
        }
        console.log("Parsed AI Response:");
        console.log(content);
        return JSON.parse(content);
    } catch (error) {
        console.error(error);
        throw new Error("AI Resume Analysis Failed");
    }
}
}),
"[project]/Downloads/FINALITICS/finlaticswebdev_project2-main/lib/db.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Downloads/FINALITICS/finlaticswebdev_project2-main/node_modules/@prisma/client)");
;
let prisma;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if (!/*TURBOPACK member replacement*/ __turbopack_context__.g.prisma) {
        /*TURBOPACK member replacement*/ __turbopack_context__.g.prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
    }
    prisma = /*TURBOPACK member replacement*/ __turbopack_context__.g.prisma;
}
const __TURBOPACK__default__export__ = prisma;
}),
"[project]/Downloads/FINALITICS/finlaticswebdev_project2-main/pages/api/upload.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$2c$__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$node_modules$2f$formidable$29$__ = __turbopack_context__.i("[externals]/formidable [external] (formidable, esm_import, [project]/Downloads/FINALITICS/finlaticswebdev_project2-main/node_modules/formidable)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$lib$2f$pdfParser$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/FINALITICS/finlaticswebdev_project2-main/lib/pdfParser.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$lib$2f$claude$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/FINALITICS/finlaticswebdev_project2-main/lib/claude.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$lib$2f$db$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/FINALITICS/finlaticswebdev_project2-main/lib/db.js [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$2c$__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$node_modules$2f$formidable$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$2c$__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$node_modules$2f$formidable$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const config = {
    api: {
        bodyParser: false
    }
};
async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });
    }
    const uploadDir = "./uploads";
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(uploadDir)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(uploadDir, {
            recursive: true
        });
    }
    const form = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$2c$__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$node_modules$2f$formidable$29$__["default"])({
        uploadDir,
        keepExtensions: true,
        multiples: false
    });
    form.parse(req, async (err, fields, files)=>{
        if (err) {
            console.error("FORMIDABLE ERROR:", err);
            return res.status(500).json({
                success: false,
                message: "Upload failed."
            });
        }
        try {
            // Formidable v3 returns an array
            const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;
            if (!file) {
                return res.status(400).json({
                    success: false,
                    message: "No PDF uploaded."
                });
            }
            console.log("PDF Path:", file.filepath);
            // Extract text from PDF
            const resumeText = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$lib$2f$pdfParser$2e$js__$5b$api$5d$__$28$ecmascript$29$__["extractResumeText"])(file.filepath);
            console.log("Resume text extracted.");
            // Analyze using Groq
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$lib$2f$claude$2e$js__$5b$api$5d$__$28$ecmascript$29$__["analyzeResume"])(resumeText);
            console.log("AI Result:");
            console.log(result);
            // Save into database
            const savedAnalysis = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$FINALITICS$2f$finlaticswebdev_project2$2d$main$2f$lib$2f$db$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].resumeAnalysis.create({
                data: {
                    fileName: file.originalFilename || "Resume.pdf",
                    score: Number(result.score) || 0,
                    strengths: result.strengths || [],
                    weaknesses: result.weaknesses || [],
                    suggestions: result.suggestions || [],
                    overallFeedback: result.overall_feedback || "No feedback available."
                }
            });
            console.log("Saved to database.");
            return res.status(200).json({
                success: true,
                analysis: {
                    ...result,
                    id: savedAnalysis.id
                }
            });
        } catch (error) {
            console.error("========== UPLOAD ERROR ==========");
            console.error(error);
            console.error("==================================");
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__20uz90l._.js.map
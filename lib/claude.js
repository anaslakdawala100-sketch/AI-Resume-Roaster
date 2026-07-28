const GROQ_API = "https://api.groq.com/openai/v1/chat/completions";

export async function analyzeResume(resumeText) {
  try {
    const response = await fetch(GROQ_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
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
            `,
          },
          {
            role: "user",
            content: resumeText,
          },
        ],
        temperature: 0.3,
      }),
    });

   const data = await response.json();

if (!data.choices || !data.choices.length) {
  throw new Error("No response received from Groq.");
}

let content = data.choices[0].message.content.trim();

// Remove markdown code fences
if (content.startsWith("```")) {
  content = content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/, "")
    .trim();
}

console.log("Parsed AI Response:");
console.log(content);

return JSON.parse(content);

  } catch (error) {
    console.error(error);

    throw new Error("AI Resume Analysis Failed");
  }
}
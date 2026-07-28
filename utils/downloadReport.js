import jsPDF from "jspdf";

export default function downloadReport(analysis) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("AI Resume Analysis Report", 20, y);

  y += 15;

  doc.setFontSize(14);
  doc.text(`Resume Score: ${analysis.score}/100`, 20, y);

  y += 15;

  doc.setFontSize(16);
  doc.text("Strengths", 20, y);

  y += 10;

  analysis.strengths.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 5;

  doc.text("Weaknesses", 20, y);

  y += 10;

  analysis.weaknesses.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 5;

  doc.text("Suggestions", 20, y);

  y += 10;

  analysis.suggestions.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 10;

  doc.text("Overall Feedback", 20, y);

  y += 10;

  const lines = doc.splitTextToSize(
    analysis.overall_feedback,
    170
  );

  doc.text(lines, 20, y);

  doc.save("AI_Resume_Report.pdf");
}
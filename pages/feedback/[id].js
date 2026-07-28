import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "../../components/Header";
import ScoreCircle from "../../components/ScoreCircle";
import FeedbackCard from "../../components/FeedbackCard";
import ProgressBar from "../../components/ProgressBar";
import downloadReport from "../../utils/downloadReport";

export default function FeedbackPage() {
  const router = useRouter();
  const { id } = router.query;

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (!id) return;

    const stored = localStorage.getItem("resumeAnalysis");

    if (stored) {
      setAnalysis(JSON.parse(stored));
    }
  }, [id]);

  if (!analysis) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center">
          <h1 className="text-2xl font-bold">
            Loading Resume Analysis...
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl font-bold text-center mb-10">
            AI Resume Report
          </h1>

          {/* Resume Score */}
          <div className="flex justify-center mb-12">
            <ScoreCircle score={analysis.score} />
          </div>

          {/* Resume Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10">

            <h2 className="text-2xl font-bold mb-6">
              Resume Metrics
            </h2>

            <ProgressBar
              title="ATS Compatibility"
              value={analysis.score}
              color="bg-green-500"
            />

            <ProgressBar
              title="Grammar"
              value={90}
              color="bg-blue-500"
            />

            <ProgressBar
              title="Formatting"
              value={85}
              color="bg-purple-500"
            />

            <ProgressBar
              title="Keyword Match"
              value={75}
              color="bg-yellow-500"
            />

          </div>

          {/* Feedback Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">

            <FeedbackCard
              title="Strengths"
              color="green"
              items={analysis.strengths}
            />

            <FeedbackCard
              title="Weaknesses"
              color="red"
              items={analysis.weaknesses}
            />

            <FeedbackCard
              title="Suggestions"
              color="blue"
              items={analysis.suggestions}
            />

          </div>

          {/* Overall Review */}
          <div className="bg-white shadow-xl rounded-xl p-8">

            <h2 className="text-3xl font-bold mb-5">
              Overall Review
            </h2>

            <p className="text-gray-700 leading-8 text-lg">
              {analysis.overall_feedback}
            </p>

          </div>

          {/* Download Button */}
          <div className="flex justify-center mt-10">

            <button
              onClick={() => downloadReport(analysis)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition"
            >
              📄 Download PDF Report
            </button>

          </div>

        </div>
      </main>
    </>
  );
}
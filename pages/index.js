import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI Resume Roaster
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Upload your resume and receive instant AI-powered feedback on
            ATS score, strengths, weaknesses, grammar, formatting,
            and improvement suggestions.
          </p>

          <Link href="/upload">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
              Upload Resume
            </button>
          </Link>

          <div className="grid md:grid-cols-3 gap-6 mt-16">

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-3">
                ATS Analysis
              </h2>

              <p className="text-gray-600">
                Evaluate how well your resume performs with ATS systems.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-3">
                AI Feedback
              </h2>

              <p className="text-gray-600">
                Receive detailed suggestions powered by Groq AI.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-3">
                Resume Score
              </h2>

              <p className="text-gray-600">
                Get an overall score with actionable recommendations.
              </p>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}
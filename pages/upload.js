import Header from "../components/Header";
import UploadDropzone from "../components/UploadDropzone";
import Link from "next/link";


export default function UploadPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800">
              Upload Your Resume
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              Upload your resume in PDF format and receive
              AI-powered feedback, ATS score, strengths,
              weaknesses, and improvement suggestions.
            </p>
          </div>

          <UploadDropzone />

          <div className="text-center mt-10">
            <Link href="/">
              <button className="bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-lg transition">
                ← Back to Home
              </button>
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
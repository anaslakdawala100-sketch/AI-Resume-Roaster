import { useRef, useState } from "react";

export default function UploadDropzone() {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      localStorage.setItem(
        "resumeAnalysis",
        JSON.stringify(data.analysis)
      );

      window.location.href = "/feedback/1";
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-blue-500 rounded-xl p-10 text-center bg-white cursor-pointer hover:bg-blue-50 transition"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          hidden
          onChange={handleFileChange}
        />

        <h2 className="text-2xl font-bold text-gray-700">
          Upload Resume
        </h2>

        <p className="mt-3 text-gray-500">
          Drag & Drop your PDF here
        </p>

        <p className="text-gray-400 mt-2">
          or click to browse
        </p>

        {selectedFile && (
          <div className="mt-6 text-green-600 font-semibold">
            Selected:
            <br />
            {selectedFile.name}
          </div>
        )}
      </div>

      <button
        onClick={handleUpload}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Upload Resume
      </button>
    </div>
  );
}
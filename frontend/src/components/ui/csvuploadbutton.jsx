import React, { useState } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";

const UploadCSVButton = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5001/csv/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      {/* File Input */}
      <label className="flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-indigo-700 transition">
        <UploadCloud className="w-4 h-4 mr-2" />
        {file ? file.name.slice(0, 15) + (file.name.length > 15 ? "..." : "") : "Choose CSV"}
        <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
      </label>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
          loading
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadCSVButton;

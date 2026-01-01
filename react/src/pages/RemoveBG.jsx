import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Combine CSS styles here
const styles = {
  dropzone: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    border: "2px dashed #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
  },
  previewImage: {
    objectFit: "cover",
    maxWidth: "100%",
    maxHeight: "100%",
  },
};

const RemoveBG = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // Check if file size is greater than 5MB
        setError("Maximum file size is 5MB");
        setSelectedFile(null);
        setProcessedImage(null);
      } else {
        setSelectedFile(file);
        setError(""); // Clear any previous error
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("images", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const processedFile = response.data.processed_files[0];
      setProcessedImage(`http://127.0.0.1:5000/download/${processedFile}`);
    } catch (error) {
      console.error("Error uploading the file:", error);
      setError("Failed to process the image. Please try again.");
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement("a");
      link.href = processedImage;
      link.download = "processed_image.png";
      link.click();
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto mt-20">
        <div className="hero-content flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                style={styles.dropzone}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      style={styles.previewImage}
                    />
                  ) : (
                    <>
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, JPEG (File MAX. 5MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <form className="card-body" onSubmit={handleSubmit}>
              {error && <div className="alert alert-warning">{error}</div>}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Remove Background
                </button>
              </div>
            </form>
            {processedImage && (
              <div className="mt-6">
                <h3 className="text-lg font-medium">Processed Image:</h3>
                <img
                  src={processedImage}
                  alt="Processed"
                  className="mt-4"
                  style={styles.previewImage}
                />
                <button
                  className="btn btn-secondary mt-4"
                  onClick={handleDownload}
                >
                  Download
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBG;

import React, { useRef, useState } from "react";
import { uploadFileApiHelper } from "../../../../apiHelper/myDrive";
import { useDispatch, useSelector } from "react-redux";
import { getFilesState, updateFiles } from "../../../../store/slice/fileSlice";

const FileUploadComponent = ({ onClick }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState("");
  const files = useSelector(getFilesState);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const openFilePicker = () => fileInputRef.current.click();

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("tags", tags);

    setLoading(true);

    try {
      const res = await uploadFileApiHelper(formData);
      console.log(res, "AFTER UPLOAD ---");
      if (!res || res?.status !== 200) throw "Something went wrong";

      // append to files
      await dispatch(updateFiles([...files, res?.data?.response]) || []);

      // reset state
      setSelectedFile(null);
      setTags("");

      // close drawer
      onClick();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false); // STOP loader
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100%" }}>
      <div className="flex-grow-1">
        <div
          className="border border-2 rounded-3 p-4 text-center mt-3"
          style={{
            borderStyle: "dashed",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
          }}
          onClick={openFilePicker}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="d-none"
            onChange={handleFileChange}
          />
          <i
            className="bi bi-upload"
            style={{ fontSize: "2rem", color: "#999" }}
          ></i>
          <p className="mt-2 text-muted mb-0">
            <strong>Click to upload</strong> or drag & drop your file here
          </p>
          {selectedFile && (
            <div className="mt-2 text-success">
              Selected: <strong>{selectedFile.name}</strong>
            </div>
          )}
        </div>

        <div className="mb-2 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Add tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-auto">
        <button
          type="button"
          className="btn btn-danger btn-lg w-100"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? (
            <span>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Uploading...
            </span>
          ) : (
            "Upload"
          )}
        </button>
      </div>
    </div>
  );
};

export default FileUploadComponent;

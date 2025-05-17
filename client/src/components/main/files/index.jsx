import React from "react";
import FilePreviewComponent from "./preview";

const FileCard = ({ file, onClick }) => {
  const { file_type, file_name, metadata } = file;

  return (
    <div
      className="card shadow-sm mb-4 d-flex flex-column justify-content-between"
      // style={{ width: "100%", maxWidth: "300px" }}
      onClick={onClick}
    >
      <FilePreviewComponent
        url={metadata?.secure_url}
        file_type={file_type}
        file_name={file_name}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6
            className="card-title text-truncate mb-0"
            title={file_name}
            style={{ flex: "1 1 auto" }}
          >
            {file_name}
          </h6>

          <i className="bi bi-eye"></i>
        </div>
      </div>
    </div>
  );
};

export default FileCard;

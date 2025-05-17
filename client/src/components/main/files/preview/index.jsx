import React from "react";

const FilePreviewComponent = ({ url, file_type = "", file_name = "" }) => {
  const renderPreview = () => {
    if (/^image\//i.test(file_type)) {
      return (
        <img
          src={url}
          alt={file_name}
          className="w-100"
          style={{ height: "160px", objectFit: "cover" }}
        />
      );
    }

    if (/^video\//i.test(file_type)) {
      return (
        <video
          controls
          src={url}
          className="w-100"
          style={{ height: "160px", objectFit: "cover" }}
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    if (/^audio\//i.test(file_type)) {
      return (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "160px" }}
        >
          <audio controls className="w-100 px-2">
            <source src={url} />
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    }

    if (/\/pdf$/i.test(file_type)) {
      url =
        "https://res.cloudinary.com/dowjtv02l/raw/upload/fl_disposition:inline/v1747472005/uploads/vunaalpkaqzvoazphtob.pdf";

      return (
        <iframe
          src={url}
          title={file_name}
          className="w-100"
          style={{ height: "160px", border: "none" }}
        ></iframe>
      );
    }

    return (
      <div
        className="d-flex align-items-center justify-content-center bg-light text-muted"
        style={{ height: "160px" }}
      >
        Unsupported file type
      </div>
    );
  };

  return renderPreview();
};

export default FilePreviewComponent;

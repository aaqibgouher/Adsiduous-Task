import React from "react";
import FileUploadComponent from "../../main/files/upload";
import FileViewComponent from "../../main/files/view";

const DrawerComponent = ({ title, type, show, onClose, file }) => {
  const renderContent = () => {
    switch (type) {
      case "UPLOAD":
        return <FileUploadComponent onClick={onClose} />;
      case "DETAILS":
        return <FileViewComponent file={file} />;
      default:
        return <p>No content found</p>;
    }
  };

  return (
    <div className={`upload-drawer ${show ? "show" : ""}`}>
      <div
        className="upload-drawer-header d-flex justify-content-between align-items-center px-3 py-2 border-bottom"
        style={{ height: "50px" }}
      >
        <h5 className="mb-0">{title}</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>
      <div
        className="upload-drawer-body p-3"
        style={{
          height: "calc(100vh - 50px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default DrawerComponent;

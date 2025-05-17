import FilePreviewComponent from "../preview";

const FileViewComponent = ({ file }) => {
  if (!file) return;

  const {
    file_name,
    file_type,
    size,
    tags = [],
    view_count,
    createdAt,
    updatedAt,
    metadata,
  } = file;

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <>
      <div className="p-3">
        {/* Preview */}
        <div className="mb-3">
          <FilePreviewComponent
            url={file?.metadata?.secure_url}
            file_type={file?.file_type}
            file_name={file?.file_name}
          />
        </div>

        {/* File Details */}
        <div className="card shadow-sm p-3 border-0 rounded-3 bg-light">
          <h5 className="mb-2">{file_name}</h5>

          <div className="mb-2 text-muted">
            <span className="me-3">
              <strong>Type:</strong> {file_type}
            </span>
            <span className="me-3">
              <strong>Size:</strong> {formatBytes(size)}
            </span>
            <span>
              <strong>Views:</strong> {view_count ?? 0}
            </span>
          </div>

          {tags?.length > 0 && (
            <div className="mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge bg-secondary me-2 mb-1"
                  style={{ fontSize: "0.85rem" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="text-muted small">
            <div>
              <strong>Created:</strong> {formatDate(createdAt)}
            </div>
            <div>
              <strong>Updated:</strong> {formatDate(updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileViewComponent;

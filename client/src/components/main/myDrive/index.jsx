import { useEffect, useRef, useState } from "react";
import DrawerComponent from "../../general/drawer";
import FileCard from "../files";
import NoFileFound from "../../../assets/notFound.jpg";
import { getFilesApiHelper } from "../../../apiHelper/myDrive";
import { getFilesState, updateFiles } from "../../../store/slice/fileSlice";
import { useDispatch, useSelector } from "react-redux";

const MyDriveComponent = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerConfig, setDrawerConfig] = useState({
    show: false,
    type: "",
    title: "",
    file: null,
  });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const files = useSelector(getFilesState);
  const isFirstRender = useRef(true);

  const openDrawer = (type, title, file = null) => {
    setDrawerConfig({ show: true, type, title, file });
  };

  const closeDrawer = () => {
    setDrawerConfig({ ...drawerConfig, show: false, file: null });
  };

  const getFiles = async (payload) => {
    try {
      const res = await getFilesApiHelper(payload);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // set files
      await dispatch(updateFiles(res?.data?.response) || []);
    } catch (error) {
      console.log("MyDriveMainComponent:getFiles - Error", error);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      getFiles({ search, sortBy }); // no debounce on first mount
      return;
    }

    const debounce = setTimeout(() => {
      getFiles({ search, sortBy });
    }, 500); // debounce for later changes

    return () => clearTimeout(debounce);
  }, [search, sortBy]);

  return (
    <>
      <div className="container my-2">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-muted mb-0">My Drive</h2>
          <button
            type="button"
            className="btn border color-dark-red px-4 py-2 fw-semibold"
            style={{
              borderColor: "#cf2e2e",
            }}
            onClick={() => openDrawer("UPLOAD", "Upload File")}
          >
            Upload
          </button>
        </div>

        {/* Search and Sort */}
        <div className="d-flex justify-content-end align-items-center mb-3 gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search files..."
            className="form-control"
            style={{ maxWidth: "250px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            style={{ maxWidth: "180px" }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort by: Default</option>
            <option value="views">Most Viewed</option>
            <option value="recent">Recent</option>
          </select>
        </div>

        {/* Files */}
        <div className="row">
          {files?.length > 0 ? (
            <div className="row">
              {files.map((file, index) => (
                <div key={index} className="col-md-4">
                  <FileCard
                    file={file}
                    onClick={() => openDrawer("DETAILS", "View File", file)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "60vh", width: "100%" }}
            >
              <img
                src={NoFileFound}
                alt="No files found"
                style={{ maxWidth: "500px", opacity: 0.9 }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Drawer */}
      <DrawerComponent
        title={drawerConfig.title}
        type={drawerConfig.type}
        show={drawerConfig.show}
        onClose={closeDrawer}
        file={drawerConfig.file}
      />
    </>
  );
};

export default MyDriveComponent;

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            minHeight: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Optional: semi-transparent overlay
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;

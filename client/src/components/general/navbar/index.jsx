import React from "react";
import LogoComponent from "../logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutApiHelper } from "../../../apiHelper/auth";
import { updateMe } from "../../../store/slice/authSlice";
import { removeData } from "../../../utils/common";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      const res = await logoutApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      // store user info to localstorage
      removeData("userData");
      await dispatch(updateMe(null));

      // redirect to dashboard
      navigate("/login");
    } catch (error) {
      console.log("NavbarComponent - logout:", error);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-light"
        style={{
          borderBottom: "1px solid #ddd",
        }}
      >
        <div className="container-fluid">
          {/* Logo */}
          <LogoComponent height="60px" width="150px" />

          {/* #fbd4d0 */}
          {/* Navbar items */}
          <div className="d-flex ms-auto align-items-center">
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn custom-btn color-dark-puple"
                style={{
                  fontSize: "24px",
                  transition: "color 0.3s ease",
                }}
                onClick={logout}
              >
                <i
                  className="bi bi-box-arrow-right color-dark-puple"
                  style={{
                    fontSize: "24px",
                    transition: "color 0.3s ease",
                  }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;

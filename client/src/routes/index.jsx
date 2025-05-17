import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth";
import LoginAuthComponent from "../components/auth/login";
import RegisterAuthComponent from "../components/auth/register";
import MainComponent from "../components/main";
import MainLayout from "../layouts/main";
import MyDriveComponent from "../components/main/myDrive";
import AuthMiddleware from "../middleware/auth";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<LoginAuthComponent />} />
          <Route path="register" element={<RegisterAuthComponent />} />
        </Route>

        {/* MAIN */}
        <Route path="/" element={<AuthMiddleware />}>
          <Route path="/" element={<MainLayout />}>
            {/* Dashboard */}
            <Route index element={<MainComponent />} />

            {/* My Drive */}
            <Route path="/my-drive">
              <Route index element={<MyDriveComponent />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;

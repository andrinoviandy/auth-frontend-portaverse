/* eslint-disable func-names */
/* eslint-disable consistent-return */
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Outlet,
} from "react-router-dom";
import UniversalCookies from "universal-cookie";
import { useEffect } from "react";
import AfterLogin from "./Modules/AfterLogin/Pages/AfterLogin";
import Login from "./Modules/Login/Pages/Login";
import ForgotPassword from "./Modules/ForgotPassword/Pages/ForgotPassword";
import CheckEmail from "./Modules/ForgotPassword/Pages/CheckEmail";
import Home from "./Modules/Landing/Pages/Home";

function App() {
  document.title = "Smart System - KMPlus Consultant";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/redirect"
          element={
            <ProtectedRoute>
              <AfterLogin />
            </ProtectedRoute>
          }
        />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const cookies = new UniversalCookies();
  const token = cookies.get("kms.session.token");
  const Navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return Navigate("/login");
    }
  }, [token]);
  return children || <Outlet />;
}

export default App;

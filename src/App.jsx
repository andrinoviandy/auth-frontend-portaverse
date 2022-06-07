import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Components/Layout/MainLayout";
import AfterLogin from "./Components/AfterLogin";
import Login from "./Components/Login";
import LandingPage from "./Components/LandingPage";
import ForgotPassword from "./Components/ForgotPassword";
import CheckEmail from "./Components/CheckEmail/CheckEmail";

function App() {
  document.title = "Smart System - KMPlus Consultant";
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}

        {/* Private */}
        {/* <Route element={<PrivateRoute />}> */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/redirect" element={<AfterLogin />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
        </Route>
        {/* </Route> */}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

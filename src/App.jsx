import { BrowserRouter, Route, Routes } from "react-router-dom";
import AfterLogin from "./Modules/AfterLogin/Pages/AfterLogin";
import Login from "./Modules/Login/Pages/Login";
import ForgotPassword from "./Modules/ForgotPassword/Pages/ForgotPassword";
import CheckEmail from "./Modules/ForgotPassword/Pages/CheckEmail";

function App() {
  document.title = "KMS - Knowledge Management System";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/" element={<AfterLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Components/Layout/MainLayout";
import Login from "./Components/Login";
import LandingPage from "./Components/LandingPage";
import ForgotPassword from "./Components/ForgotPassword";
import CheckEmail from "./Components/CheckEmail/CheckEmail";
import ChooseProducts from "./Components/ChooseProducts/ChooseProducts";
import SetNewPassword from "./Components/SetNewPassword";
import NewPassSuccess from "./Components/NewPassSuccess";

function App() {
  document.title = "Smart System - KMPlus Consultant";
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<MainLayout />}>
          <Route path="/check-email" element={<CheckEmail />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
        </Route>

        <Route element={<MainLayout />}>
          <Route
            path="/reset-password"
            element={<SetNewPassword />}
          />
          <Route path="/success" element={<NewPassSuccess />} />
        </Route>

        {/* Private */}
        {/* <Route element={<PrivateRoute />}> */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ChooseProducts />} />
        </Route>
        {/* </Route> */}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckEmail from "./Components/CheckEmail/CheckEmail";
import ChooseProducts from "./Components/ChooseProducts/ChooseProducts";
import Error404 from "./Components/Error/Error404";
import ForgotPassword from "./Components/ForgotPassword";
import LandingPage from "./Components/LandingPage";
import MainLayout from "./Components/Layout/MainLayout";
import Login from "./Components/Login";
import NewPassSuccess from "./Components/NewPassSuccess";
import PrivateRoute from "./Components/Private/PrivateRoute";
import SetNewPassword from "./Components/SetNewPassword";

function App() {
  document.title = "Smart System - KMPlus Consultant";
  const user = localStorage.getItem("user");
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
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <PrivateRoute
                isAllowed={!user}
                redirectPath="/products"
              >
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute isAllowed={!!user}>
                <ChooseProducts />
              </PrivateRoute>
            }
          />
        </Route>
        {/* </Route> */}

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

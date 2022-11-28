import { ModalDef } from "@ebay/nice-modal-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckEmail from "./Components/CheckEmail";
import Error404 from "./Components/Errors/404";
import ErrorHandling from "./Components/Errors/ErrorHandling";
import SuccessHandling from "./Components/Errors/SuccessHandling";
import ForgotPassword from "./Components/ForgotPassword";
import LandingPage from "./Components/LandingPage";
import MainLayout from "./Components/Layouts/MainLayout";
import Login from "./Components/Login";
import NewPassSuccess from "./Components/NewPassSuccess";
import PrivateRoutes from "./Components/Private/PrivateRoutes";
import Referal from "./Components/Referal/Referal";
import SetNewPassword from "./Components/SetNewPassword";
import userAuthorization from "./Utils/Helpers/userAuthorization";

function App() {
  document.title = "Portaverse - Pelindo";

  const { isAuthorized } = userAuthorization();

  return (
    <BrowserRouter>
      <ModalDef
        id="success-handling-dialog"
        component={SuccessHandling}
      />
      <ModalDef
        id="error-handling-dialog"
        component={ErrorHandling}
      />
      <Routes>
        <Route
          element={
            <PrivateRoutes
              isAuthorized={isAuthorized}
              redirect="/login"
            />
          }
        >
          <Route element={<MainLayout />}>
            {/* Can only be access when user logged in */}
            {/* <Route path="/products" element={<ChooseProducts />} /> */}
            <Route path="/referals" element={<Referal />} />
          </Route>
        </Route>

        <Route
          element={
            <PrivateRoutes
              isAuthorized={isAuthorized}
              // redirect="/products"
              redirect={`${import.meta.env.VITE_KMS_URL}/home`}
            />
          }
        >
          <Route element={<MainLayout />}>
            {/* Can only be access when user not logged in */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            {/* Can only be access by the app flow and user not logged in */}
            <Route path="/check-email" element={<CheckEmail />} />
            <Route
              path="/reset-password"
              element={<SetNewPassword />}
            />
            <Route path="/success" element={<NewPassSuccess />} />
          </Route>
        </Route>

        {/* Public */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

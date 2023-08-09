import { ModalDef } from "@ebay/nice-modal-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "./Components/Errors/404";
import ErrorHandling from "./Components/Errors/ErrorHandling";
import SuccessHandling from "./Components/Errors/SuccessHandling";
import LoginLayout from "./Components/Layouts/LoginLayout";
import MainLayout from "./Components/Layouts/MainLayout";
import MobileBanner from "./Components/Misc/MobileBanner";
import PrivateRoutes from "./Components/Private/PrivateRoutes";
import NewCheckEmail from "./Pages/CheckEmail/NewCheckEmail";
import NewForgotPassword from "./Pages/ForgotPassword/NewForgotPassword";
import LandingPage from "./Pages/LandingPage";
import NewLandingPageAuthorized from "./Pages/LandingPageAuthorized/NewLandingPageAuthorized";
import NewLogin from "./Pages/Login";
import NewPassSuccess from "./Pages/NewPassSuccess";
import Referal from "./Pages/Referal/Referal";
import NewSetNewPassword from "./Pages/SetNewPassword/NewSetNewPassword";
import userAuthorization from "./Utils/Helpers/userAuthorization";

function App() {
  document.title = "Portaverse - Pelindo";

  const { isAuthorized } = userAuthorization();

  return (
    <BrowserRouter>
      <MobileBanner />
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
              isAuthorized={!isAuthorized}
              redirect="/login"
            />
          }
        >
          <Route
            path="/landing"
            element={<NewLandingPageAuthorized />}
          />
        </Route>
        <Route
          element={
            <PrivateRoutes
              isAuthorized={isAuthorized}
              // redirect="/products"
              // redirect={`${import.meta.env.VITE_KMS_URL}/home`}
              redirect="/landing"
            />
          }
        >
          <Route element={<LoginLayout />}>
            {/* Can only be access when user not logged in */}
            <Route path="/login" element={<NewLogin />} />
            <Route
              path="/forgot-password"
              element={<NewForgotPassword />}
            />

            {/* Can only be access by the app flow and user not logged in */}
            <Route path="/check-email" element={<NewCheckEmail />} />
            <Route
              path="/reset-password"
              element={<NewSetNewPassword />}
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

import { ModalDef } from "@ebay/nice-modal-react";
import { isAndroid, isIOS } from "react-device-detect";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Error404 from "./Components/Errors/404";
import ErrorHandling from "./Components/Errors/ErrorHandling";
import SuccessHandling from "./Components/Errors/SuccessHandling";
import LoginLayout from "./Components/Layouts/LoginLayout";
import MainLayout from "./Components/Layouts/MainLayout";
import MobileBanner from "./Components/Misc/MobileBanner";
import Confirmations from "./Components/Modals/Confirmations";
import MODAL_IDS from "./Components/Modals/modalIds";
import ModalPortal from "./Components/Modals/ModalPortal";
import PrivateRoutes from "./Components/Private/PrivateRoutes";
import NewCheckEmail from "./Pages/CheckEmail/NewCheckEmail";
import DailyQuizRoute from "./Pages/DailyQuiz/Route";
import NewForgotPassword from "./Pages/ForgotPassword/NewForgotPassword";
import NewForgotPasswordMobile from "./Pages/ForgotPassword/NewForgotPasswordMobile";
import LandingPage from "./Pages/LandingPage";
import NewLandingPageAuthorized from "./Pages/LandingPageAuthorized/NewLandingPageAuthorized";
import NewLogin from "./Pages/Login";
import NewLoginMobile from "./Pages/Login/NewLoginMobile";
import MobileSSOBridge from "./Pages/MobileSSOBridge";
import NewPassSuccess from "./Pages/NewPassSuccess";
import Notifications from "./Pages/Notifications/Notifications";
import ProgressEvaluationReport from "./Pages/ProgressEvaluationReport/ProgressEvaluationReport";
import Referal from "./Pages/Referal/Referal";
import NewSetNewPassword from "./Pages/SetNewPassword/NewSetNewPassword";
import SignUpExternalUser from "./Pages/SignUp/SignUpExternalUser";
import UserRegistration from "./Pages/UserRegistration";
import VerifyOTP from "./Pages/VerifyOTP";
import userAuthorization from "./Utils/Helpers/userAuthorization";

function ProtectedVerifyOTP() {
  const isBlocked = localStorage.getItem("otp_blocked") === "true";
  return isBlocked ? <Error404 /> : <VerifyOTP />;
}

function ProtectedLanding() {
  const isBlocked = localStorage.getItem("otp_blocked") === "true";
  const isEmailOtpRequired =
    localStorage.getItem("isEmailOtpRequired") === "1";

  if (isBlocked) return <Error404 />;
  if (isEmailOtpRequired) return <VerifyOTP />;

  return <NewLandingPageAuthorized />;
}

function App() {
  document.title = "Portaverse - Pelindo";

  const { isAuthorized } = userAuthorization();

  return (
    <BrowserRouter>
      <MobileBanner />
      <ModalDef
        id={MODAL_IDS.GENERAL.CONFIRMATION}
        component={Confirmations}
      />
      <ModalDef
        id="success-handling-dialog"
        component={SuccessHandling}
      />
      <ModalDef
        id="error-handling-dialog"
        component={ErrorHandling}
      />
      <ModalPortal />

      <Routes>
        <Route
          element={
            <PrivateRoutes
              isAuthorized={isAuthorized}
              redirect="/login"
            />
          }
        >
          <Route element={<DailyQuizRoute />}>
            <Route element={<MainLayout />}>
              {/* Can only be access when user logged in */}
              {/* <Route path="/products" element={<ChooseProducts />} /> */}
              <Route path="/referals" element={<Referal />} />
            </Route>
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
          <Route element={<DailyQuizRoute />}>
            <Route
              path="/landing"
              element={<ProtectedLanding />}
              // element={<NewLandingPageAuthorized />}
            />
            <Route
              path="/notifications"
              element={<Notifications />}
            />
            <Route
              path="/progress-eval-report"
              element={<ProgressEvaluationReport />}
            />
            <Route
              path="/progress-eval-report/:employeeId"
              element={<ProgressEvaluationReport />}
            />
          </Route>
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
          {isAndroid || isIOS ? (
            <Route>
              <Route path="/login" element={<NewLoginMobile />} />
              <Route
                path="/forgot-password"
                element={<NewForgotPasswordMobile />}
              />
              <Route
                path="/check-email"
                element={<NewCheckEmail />}
              />
              <Route
                path="/reset-password"
                element={<NewSetNewPassword />}
              />
              <Route path="/success" element={<NewPassSuccess />} />
            </Route>
          ) : (
            <Route element={<LoginLayout />}>
              {/* Can only be access when user not logged in */}
              <Route path="/login" element={<NewLogin />} />
              <Route
                path="/forgot-password"
                element={<NewForgotPassword />}
              />

              {/* Can only be access by the app flow and user not logged in */}
              <Route
                path="/check-email"
                element={<NewCheckEmail />}
              />
              <Route
                path="/reset-password"
                element={<NewSetNewPassword />}
              />
              <Route path="/success" element={<NewPassSuccess />} />
              <Route
                path="/sign-up-user-external/:invitationCode"
                element={<SignUpExternalUser />}
              />
            </Route>
          )}
        </Route>

        {/* Public */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/email-otp/:targetUID"
            element={<ProtectedVerifyOTP />}
          />
        </Route>
        <Route
          path="/activate-account"
          element={<UserRegistration />}
        />

        {/* Mobile SSO Bridge - Public route without layout */}
        <Route
          path="/sso/mobile-bridge"
          element={<MobileSSOBridge />}
        />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

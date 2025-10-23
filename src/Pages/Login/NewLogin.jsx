import { Icon } from "@iconify/react";
import {
  Button,
  Checkbox,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import EyeOffOutline from "../../Components/Assets/Icon/EyeOffOutline";
import EyeOutline from "../../Components/Assets/Icon/EyeOutline";
import PortaverseLogo from "../../Components/Assets/Pictures/PortaverseLogoV2.png";
import postLogin from "../../Networks/Login";
import useValidateInput from "../../Utils/Hooks/useValidateInput";
import { useGenerateOTPPost } from "../VerifyOTP/hooks/useGenerateOTPPost";
import axiosSSOClient from "../../Configs/AxiosClient/ssoAxiosClient";
import otpLogin from "../../Networks/LoginOTP";
import VerifyOTP from "../VerifyOTP";

const form = {
  email: "",
  password: "",
  isRemember: false,
};

// eslint-disable-next-line react/prop-types
export const onToggleVisibility = memo(({ reveal, size }) =>
  reveal ? <EyeOutline size={size} /> : <EyeOffOutline size={size} />,
);

const MAX_REATTEMPT = 3;

export default function NewLogin() {
  const navigate = useNavigate();
  const [payload, setPayload] = useState(form);
  const [captcha, setCaptcha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uidUser, setUidUser] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCaptcha, setErrorCaptcha] = useState("");
  const [wrongCredsAttempt, setWrongCredsAttempt] = useState(0);

  const { mutate: generateOtp, isLoading: loadingOTP } =
    useGenerateOTPPost();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
    setErrorEmail("");
    setErrorPassword("");
  };

  const handleFetchError = (error) => {
    if (error === "Email or Password is incorrect") {
      setWrongCredsAttempt((prev) => prev + 1);
    }
    setFetchError(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFetchError("");

    let errCaptcha = "";
    if (wrongCredsAttempt > MAX_REATTEMPT) {
      errCaptcha = !validateCaptcha(captcha)
        ? "Captcha salah, silahkan coba kembali"
        : "";
      setErrorCaptcha(errCaptcha);
    }

    // Accommodate super login
    const [userEmail, targetUID] = payload.email.split("-$$-");
    payload.email = userEmail;
    payload.targetUID = targetUID;

    const errEmail = useValidateInput("email", payload.email);
    setErrorEmail(errEmail);

    const errPassword = useValidateInput(
      "password",
      payload.password,
    );
    setErrorPassword(errPassword);

    const validEmailPassword =
      payload.email.length > 1 &&
      !errEmail &&
      payload.password.length > 1 &&
      !errPassword;

    if (
      wrongCredsAttempt > MAX_REATTEMPT
        ? validEmailPassword && !errCaptcha
        : validEmailPassword
    ) {
      otpLogin(
        payload,
        setIsLoading,
        setUidUser,
        handleFetchError,
        (targetUID) => {
          generateOtp(
            { uid: targetUID },
            {
              onSuccess: (res) => {
                localStorage.setItem(
                  "isEmailOtpRequired",
                  res.data.isEmailOtpRequired,
                );
                const expiry = new Date(res.data.expiredAt).getTime();
                localStorage.setItem(
                  "otp_countdown",
                  expiry.toString(),
                );
                if (res.data.isEmailOtpRequired === 1) {
                  // window.location.href = res.data.link;
                  localStorage.removeItem("uidOTP");
                  navigate(`/email-otp/${res.data.uuid}`, {
                    state: {
                      uidUser: targetUID,
                      uidOTP: res.data.uuid,
                      payload: payload,
                    },
                  });
                } else if (res.data.isEmailOtpRequired === 0) {
                  localStorage.setItem("otp_verified", "true");
                  localStorage.removeItem("otp_countdown");
                  localStorage.removeItem("isEmailOtpRequired");
                  postLogin(payload, setIsLoading, handleFetchError);
                } else {
                  setFetchError("OTP link not found in response");
                }
              },
              onError: () => {
                document.cookie.split(";").forEach((c) => {
                  document.cookie = c
                    .replace(/^ +/, "")
                    .replace(
                      /=.*/,
                      `=;expires=${new Date(0).toUTCString()};path=/`,
                    );
                });
                setFetchError(
                  "Failed to generate OTP. Please try again.",
                );
              },
            },
          );
        },
      );
    }
  };

  useEffect(() => {
    if (wrongCredsAttempt > MAX_REATTEMPT) {
      loadCaptchaEnginge(6);
    }
  }, [wrongCredsAttempt]);

  useEffect(() => {
    localStorage.removeItem("otp_verified");
    localStorage.removeItem("isEmailOtpRequired");
    localStorage.removeItem("otp_countdown");
  }, []);

  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="flex flex-col gap-2 items-start">
        <img
          src={PortaverseLogo}
          alt="company_logo"
          className="h-[60px] object-contain"
        />
        <p className="text-darkGrey font-medium">
          Universe of Growth & Agility
        </p>
      </div>

      <div className="flex justify-center flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <TextInput
            radius="md"
            label="Email"
            placeholder="Masukan email"
            size="md"
            name="email"
            // type="email"
            classNames={{
              root: "w-full",
              label: "mb-2",
            }}
            value={payload.email}
            error={errorEmail}
            onChange={handleOnChange}
          />

          <div>
            <PasswordInput
              radius="md"
              label="Password"
              placeholder="Masukan password"
              size="md"
              name="password"
              classNames={{
                root: "w-full",
                label: "mb-2",
              }}
              // type="password"
              value={payload.password}
              error={errorPassword}
              onChange={handleOnChange}
              visibilityToggleIcon={onToggleVisibility}
            />

            <p className="text-red-500 text-center text-sm mt-2">
              {fetchError}
            </p>
          </div>

          {wrongCredsAttempt > MAX_REATTEMPT && (
            <>
              <LoadCanvasTemplate />
              <TextInput
                placeholder="Tulis text di atas"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                error={errorCaptcha}
              />
            </>
          )}

          <div className="flex justify-between items-center">
            <Link
              to="/forgot-password"
              className="text-primary3 font-secondary text-base font-semibold"
            >
              Forgot password?
            </Link>
            <Checkbox
              size="md"
              label="Remember me"
              onChange={(e) =>
                setPayload({
                  ...payload,
                  isRemember: e.target.checked,
                })
              }
              checked={payload.isRemember}
              classNames={{ label: "secondary" }}
            />
          </div>

          <Button loading={isLoading || loadingOTP} type="submit">
            Sign In
          </Button>

          <div>
            {/* Divider with "Atau" text */}
            <div className="mb-6 mt-2 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-sm text-gray-600">Atau</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            {/* Aktivasi Akun Button */}
            <Link to="/activate-account">
              <Button type="Button" variant="outline" fullWidth>
                Aktivasi Akun Portaverse Baru
              </Button>
            </Link>
          </div>
        </form>

        <a
          className="text-darkGrey mt-7 flex items-center font-semibold"
          href="http://wa.me/+628113117698"
        >
          <Icon
            icon="mingcute:service-fill"
            className="inline mr-2"
            width={20}
          />
          Helpdesk
        </a>
      </div>
    </div>
  );
}

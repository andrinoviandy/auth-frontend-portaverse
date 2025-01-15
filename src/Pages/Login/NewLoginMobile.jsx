import { Icon } from "@iconify/react";
import {
  Button,
  Checkbox,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

export default function NewLoginMobile() {
  const [payload, setPayload] = useState(form);
  const [captcha, setCaptcha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCaptcha, setErrorCaptcha] = useState("");
  const [wrongCredsAttempt, setWrongCredsAttempt] = useState(0);

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
      postLogin(payload, setIsLoading, handleFetchError);
    }
  };

  useEffect(() => {
    if (wrongCredsAttempt > MAX_REATTEMPT) {
      loadCaptchaEnginge(6);
    }
  }, [wrongCredsAttempt]);

  return (
    <div className="flex min-h-screen w-full flex-col justify-center gap-16 px-2">
      <div className="space-y-10 rounded-xl border p-5 shadow-card">
        <div className="flex flex-col items-start gap-2">
          <img
            src={PortaverseLogo}
            alt="company_logo"
            className="h-[60px] object-contain"
          />
          <p className="font-medium text-darkGrey">
            Universe of Growth & Agility
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-4"
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

              <p className="mt-2 text-center text-sm text-red-500">
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

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="font-secondary text-base font-semibold text-primary3"
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

            <Button loading={isLoading} type="submit">
              Sign In
            </Button>
          </form>

          <a
            className="mt-7 flex items-center font-semibold text-darkGrey"
            href="http://wa.me/+628113117698"
          >
            <Icon
              icon="mingcute:service-fill"
              className="mr-2 inline"
              width={20}
            />
            Helpdesk
          </a>
        </div>
      </div>
    </div>
  );
}

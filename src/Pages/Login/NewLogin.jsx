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

export default function NewLogin() {
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

          <Button loading={isLoading} type="submit">
            Sign In
          </Button>
        </form>

        <a
          className="text-darkGrey mt-7 flex items-center font-semibold"
          href="http://wa.me/+6281911111375"
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

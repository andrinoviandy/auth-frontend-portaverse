import { Icon } from "@iconify/react";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
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

export default function NewLogin() {
  const [payload, setPayload] = useState(form);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [validateEmail, setValidateEmail] = useState("");
  const [validatePassword, setValidatePassword] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
    setValidateEmail("");
    setValidatePassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFetchError("");

    const errEmail = useValidateInput("email", payload.email);
    setValidateEmail(errEmail);

    const errPassword = useValidateInput(
      "password",
      payload.password,
    );
    setValidatePassword(errPassword);

    if (
      payload.email.length > 1 &&
      !errEmail &&
      payload.password.length > 1 &&
      !errPassword
    ) {
      postLogin(payload, setIsLoading, setFetchError);
    }
  };

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
            className="w-full"
            value={payload.email}
            error={validateEmail}
            onChange={handleOnChange}
          />

          <div>
            <PasswordInput
              radius="md"
              label="Password"
              placeholder="Masukan password"
              size="md"
              name="password"
              // type="password"
              value={payload.password}
              error={validatePassword}
              onChange={handleOnChange}
              visibilityToggleIcon={onToggleVisibility}
            />

            <p className="text-red-500 text-center text-sm mt-2">
              {fetchError}
            </p>
          </div>

          <Link
            to="/forgot-password"
            className="text-primary3 font-secondary text-base font-semibold"
          >
            Forgot password?
          </Link>

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

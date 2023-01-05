import { Icon } from "@iconify/react";
import { Checkbox, PasswordInput, TextInput } from "@mantine/core";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import EyeOffOutline from "../../Components/Assets/Icon/EyeOffOutline";
import EyeOutline from "../../Components/Assets/Icon/EyeOutline";
import LoadingButton from "../../Components/Assets/Icon/LoadingButton";
import PortaverseLogo from "../../Components/Assets/Pictures/PortaverseLogo.png";
import postLogin from "../../Networks/Login";
import useValidateInput from "../../Utils/Hooks/useValidateInput";

const form = {
  email: "",
  password: "",
  isRemember: false,
};

// eslint-disable-next-line react/prop-types
const onToggleVisibility = memo(({ reveal, size }) =>
  reveal ? <EyeOutline size={size} /> : <EyeOffOutline size={size} />,
);

function Login() {
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
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center text-center">
        <img
          src={PortaverseLogo}
          alt="company_logo"
          className="h-[100px]"
        />
        {/* <p className="font-semibold text-4xl text-text1">
          Welcome to
        </p>
        <p className="font-semibold text-5xl py-2 text-primary3">
          portaverse
        </p> */}
      </div>

      <div className="flex justify-center flex-col items-center">
        <div className="w-[22rem] px-8 py-5 border-[1px] border-gray/10 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h4 className="font-medium my-1.5">Email</h4>
              <TextInput
                radius="md"
                placeholder="Enter your email"
                size="md"
                name="email"
                // type="email"
                value={payload.email}
                error={validateEmail}
                onChange={handleOnChange}
              />
            </div>

            <div className="mb-3">
              <h4 className="font-medium my-1.5">Password</h4>
              <PasswordInput
                radius="md"
                placeholder="Password"
                size="md"
                name="password"
                // type="password"
                value={payload.password}
                error={validatePassword}
                onChange={handleOnChange}
                visibilityToggleIcon={onToggleVisibility}
              />
            </div>

            <p className="text-red-500 text-center">{fetchError}</p>

            <div className="flex items-center justify-between mb-3 mt-6">
              <Checkbox
                size="xs"
                label="Remember me"
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    isRemember: e.target.checked,
                  })
                }
                checked={payload.isRemember}
                styles={{
                  label: {
                    fontSize: "0.775rem",
                    lineHeight: "1rem",
                    paddingLeft: "5px",
                  },
                }}
                classNames={{ label: "secondary" }}
              />

              <Link
                to="/forgot-password"
                className="text-primary3 hover:underline font-secondary text-[0.775rem]"
              >
                Forgot password?
              </Link>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`font-secondary w-full bg-primary3 font-medium ${
                !isLoading && "hover:bg-primary4"
              } text-white py-2 px-4 rounded my-1.5`}
            >
              {isLoading ? (
                <>
                  <LoadingButton />
                  <span>Loading...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>
          {false && (
            <button
              type="button"
              className="font-secondary w-full font-semibold text-primary3 hover:text-primary4 hover:bg-bg1 py-2 px-4 rounded my-1.5"
            >
              <a href={`${import.meta.env.VITE_KMS_URL}/home`}>
                Enter as guest
              </a>
            </button>
          )}
        </div>
        <a
          className="text-darkGray mt-7 flex items-center"
          href="http://wa.me/+6281911111375"
        >
          <Icon
            icon="bx:support"
            className="inline mr-2"
            color="#016db2"
          />
          Help Center
        </a>
      </div>
    </div>
  );
}

export default Login;

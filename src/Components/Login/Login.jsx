import { TextInput, PasswordInput, Checkbox } from "@mantine/core";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import EyeOffOutline from "../Assets/Icon/EyeOffOutline";
import EyeOutline from "../Assets/Icon/EyeOutline";
import LoadingButton from "../Assets/Icon/LoadingButton";

const form = {
  email: "",
  password: "",
  isRemember: false,
};

function Login() {
  const [payload, setPayload] = useState(form);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("handleLogin");
    // postLogin(
    //   email,
    //   password,
    //   isRemember,
    //   setIsLoading,
    //   setError,
    //   setPassword,
    //   Navigate,
    // );
  };

  return (
    <div className="grid gap-10">
      <div className="text-center">
        <p className="font-semibold text-4xl text-text1">
          Welcome to
        </p>
        <p className="font-semibold text-5xl py-2 text-primary1">
          SMART SYSTEM
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-[22rem] px-8 py-5 border-[1px] border-gray/10 rounded-md shadow-md">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <h4 className="font-medium my-1.5">Email</h4>
              <TextInput
                radius="md"
                placeholder="Enter your email"
                size="md"
                name="email"
                value={payload.email}
                error={errMsg}
                onChange={(e) => {
                  setPayload({ ...payload, email: e.target.value });
                }}
                required
              />
            </div>

            <div className="mb-3">
              <h4 className="font-medium my-1.5">Password</h4>
              <PasswordInput
                radius="md"
                placeholder="Password"
                size="md"
                name="password"
                value={payload.password}
                error={errMsg}
                onChange={(e) => {
                  setPayload({
                    ...payload,
                    password: e.target.value,
                  });
                }}
                visibilityToggleIcon={memo(({ reveal, size }) =>
                  reveal ? (
                    <EyeOutline size={size} />
                  ) : (
                    <EyeOffOutline size={size} />
                  ),
                )}
                required
              />
            </div>

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
                    fontFamily: "Roboto",
                  },
                }}
              />

              <Link
                to="/forgot-password"
                className="text-primary1 hover:underline font-sans text-[0.775rem]"
              >
                Forgot password?
              </Link>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`font-sans w-full bg-primary1 font-medium ${
                !isLoading && "hover:bg-primary2"
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

          <button
            type="button"
            className="font-sans w-full font-semibold text-primary1 hover:text-primary2 hover:bg-bg1 py-2 px-4 rounded my-1.5"
          >
            Enter as guest
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

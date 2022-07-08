import { TextInput } from "@mantine/core";
import { useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { setNewPassword } from "../../Utils/Helpers/firebaseAuth";
import useValidateInput from "../../Utils/Hooks/useValidateInput";
import KeyIcon from "../Assets/Icon/KeyIcon";
import LoadingButton from "../Assets/Icon/LoadingButton";
import RoundKeyboardBackspace from "../Assets/Icon/RoundKeyboardBackspace";

const form = {
  password: "",
  confirmPassword: "",
};

export default function SetNewPassword() {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const actionCode = params.get("oobCode");

  const [payload, setPayload] = useState(form);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [validateNewPassword, setValidateNewPassword] = useState("");
  const [validateConfirmPassword, setValidateConfirmPassword] =
    useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
    setValidateNewPassword("");
    setValidateConfirmPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errNewPassword = useValidateInput(
      "newPassword",
      payload.password,
    );
    setValidateNewPassword(errNewPassword);

    const errConfirmPassword = useValidateInput(
      "newPassword",
      payload.confirmPassword,
    );
    setValidateConfirmPassword(errConfirmPassword);

    if (
      !errNewPassword &&
      payload.password !== payload.confirmPassword
    ) {
      setValidateNewPassword("Password does not match");
      setValidateConfirmPassword("Password does not match");
      return;
    }

    if (payload.password.length > 1 && !errNewPassword) {
      setIsLoading(true);
      setNewPassword(actionCode, payload.password)
        .then(() =>
          navigate("/success", {
            replace: true,
            state: { status: "resetPasswordSuccess" },
          }),
        )
        .catch(() =>
          setFetchError(
            "Invalid action code, please try resetting the password again",
          ),
        )
        .finally(() => setIsLoading(false));
    }
  };

  if (!actionCode) return <Navigate to="/login" replace />;

  return (
    <div className="grid justify-items-center">
      <KeyIcon />

      <div className="text-center">
        <h1 className="font-semibold text-3xl text-text1 my-5">
          Set new password
        </h1>
        <p className="font-sans font-medium text-gray">
          Your new password must be different than your previous one.
        </p>
      </div>

      <div className="w-[22rem] mt-7">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h4 className="font-medium my-1.5">Password</h4>
            <TextInput
              radius="md"
              placeholder="Enter your new password"
              size="md"
              name="password"
              type="password"
              value={payload.password}
              error={validateNewPassword}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <h4 className="font-medium my-1.5">Confirm Password</h4>
            <TextInput
              radius="md"
              placeholder="Confirm password"
              size="md"
              name="confirmPassword"
              type="password"
              value={payload.confirmPassword}
              error={validateConfirmPassword}
              onChange={handleOnChange}
            />
          </div>

          <p className="text-red-500 text-center">{fetchError}</p>

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
              <span>Reset Password</span>
            )}
          </button>
        </form>

        <Link
          to="/login"
          className="font-sans font-medium text-gray hover:text-darkGray hover:bg-bg1 py-1 px-4 flex rounded items-center justify-center"
        >
          <RoundKeyboardBackspace />
          <span>Back to login</span>
        </Link>
      </div>
    </div>
  );
}

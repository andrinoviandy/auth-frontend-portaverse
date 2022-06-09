import { useState } from "react";
import { Link } from "react-router-dom";
import { TextInput } from "@mantine/core";
import KeyIcon from "../Assets/Icon/KeyIcon";
import RoundKeyboardBackspace from "../Assets/Icon/RoundKeyboardBackspace";
import LoadingButton from "../Assets/Icon/LoadingButton";

const form = {
  password: "",
  confirmPassword: "",
};

export default function SetNewPassword() {
  const [payload, setPayload] = useState(form);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submit");
  };

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
              value={payload.password}
              error={errMsg}
              onChange={(e) =>
                setPayload({ ...payload, password: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <h4 className="font-medium my-1.5">Confirm Password</h4>
            <TextInput
              radius="md"
              placeholder="Confirm password"
              size="md"
              name="confirmPassword"
              value={payload.confirmPassword}
              error={errMsg}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
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

import { TextInput } from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyIcon from "../../Components/Assets/Icon/KeyIcon";
import LoadingButton from "../../Components/Assets/Icon/LoadingButton";
import RoundKeyboardBackspace from "../../Components/Assets/Icon/RoundKeyboardBackspace";
import sendForgotPassword from "../../Networks/ForgotPassword";
import useValidateInput from "../../Utils/Hooks/useValidateInput";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [validateEmail, setValidateEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setValidateEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errEmail = useValidateInput("email", email);
    setValidateEmail(errEmail);

    if (email.length > 1 && !errEmail) {
      sendForgotPassword(email, setIsLoading, setFetchError, () => {
        navigate("/check-email", { state: { email } });
      });
    }
  };

  return (
    <div className="grid justify-items-center">
      <KeyIcon />

      <div className="text-center">
        <h1 className="font-semibold text-3xl text-text1 my-5">
          Forgot password?
        </h1>
        <p className="font-secondary font-medium text-gray">
          Don&apos;t worry, we will send you an instruction
        </p>
      </div>

      <div className="w-[22rem] mt-7">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h4 className="font-medium my-1.5">Email</h4>
            <TextInput
              radius="md"
              placeholder="Enter your email"
              size="md"
              name="email"
              // type="email"
              value={email}
              error={validateEmail}
              onChange={handleOnChange}
            />
          </div>

          <p className="text-red-500 text-center">{fetchError}</p>

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
              <span>Reset Password</span>
            )}
          </button>
        </form>

        <Link
          to="/login"
          className="font-secondary font-medium text-gray hover:text-darkGray hover:bg-bg1 py-1 px-4 flex rounded items-center justify-center"
        >
          <RoundKeyboardBackspace />
          <span>Back to login</span>
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;

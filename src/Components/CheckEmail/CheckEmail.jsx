import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import resendResetPassword from "../../Networks/Resend";
import EmailIcon from "../Assets/Icon/Email";
import LoadingButton from "../Assets/Icon/LoadingButton";
import RoundKeyboardBackspace from "../Assets/Icon/RoundKeyboardBackspace";

const countdown = 60; // in seconds

function CheckEmail() {
  const [timer, setTimer] = useState(countdown);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const { state } = useLocation();

  const handleOpenMail = () => {
    // choose one
    window.open("https://gmail.com", "_blank");
    // window.location = "mailto:{yourmail@domain.com}";
  };

  const handleResend = () => {
    resendResetPassword(state.email, setIsLoading, setFetchError);
  };

  useEffect(() => {
    if (!isLoading) {
      setTimer(countdown);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!timer) return undefined;

    const intervalId = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  if (!state) return <Navigate to="/login" replace />;

  return (
    <div className="grid justify-items-center">
      <EmailIcon />

      <div className="text-center">
        <h1 className="font-semibold text-3xl text-text1 my-5">
          Check your email
        </h1>
        <p className="font-sans font-medium text-gray">
          We sent a password reset link to
          <br />
          <span className="text-center text-darkGray">
            {state.email}
          </span>
        </p>
      </div>

      <div className="w-[22rem] mt-7">
        <button
          type="submit"
          className="font-sans w-full bg-primary1 font-medium hover:bg-primary2 text-white py-2 px-4 rounded my-1.5"
          onClick={handleOpenMail}
        >
          Open email app
        </button>

        <div className="flex items-center justify-center gap-2 my-3">
          {timer > 0 && fetchError.length === 0 ? (
            <>
              <h5 className="text-gray font-sans">Resend in</h5>
              <span className="text-primary1 font-semibold">
                {timer} second
              </span>
            </>
          ) : (
            <>
              <h5 className="text-sm text-gray font-sans">
                Didn&apos;t receive the email?
              </h5>
              {(() => {
                if (isLoading) {
                  return (
                    <span className="ml-2.5">
                      <LoadingButton className="text-primary1" />
                    </span>
                  );
                }

                if (fetchError.trim().length > 0) {
                  return (
                    <span>
                      {fetchError}
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-primary1 font-medium hover:underline"
                      >
                        Retry
                      </button>
                    </span>
                  );
                }

                return (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-primary1 font-medium hover:underline"
                  >
                    Click here
                  </button>
                );
              })()}
            </>
          )}
        </div>

        <Link
          to="/login"
          className="font-sans font-medium text-gray hover:text-darkGray hover:bg-bg1 py-1 px-4 flex rounded items-center justify-center my-1.5"
        >
          <RoundKeyboardBackspace />
          <span>Back to login</span>
        </Link>
      </div>
    </div>
  );
}

export default CheckEmail;

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EmailIcon from "../Assets/Icon/Email";
import RoundKeyboardBackspace from "../Assets/Icon/RoundKeyboardBackspace";

function CheckEmail() {
  const [countResend, setCountResend] = useState(60);
  const { state } = useLocation();
  const { email } = state;

  const handleOpenMail = () => {
    // pake salah satu
    window.open("https://gmail.com", "_blank");
    // window.location = "mailto:{yourmail@domain.com}";
  };

  useEffect(() => {
    if (countResend > 0) {
      setTimeout(() => {
        setCountResend(countResend - 1);
      }, 1000);
    }
  });

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
          <p className="text-center text-darkGray">{email}</p>
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
          {countResend > 0 ? (
            <>
              <h5 className="text-gray font-sans">Resend in</h5>
              <span className="text-primary1 font-semibold">
                {countResend} second
              </span>
            </>
          ) : (
            <>
              <h5 className="text-sm text-gray font-sans">
                Didn&apos;t receive the email?
              </h5>
              <button
                type="button"
                className="text-primary1 font-medium hover:underline"
              >
                Click here
              </button>
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

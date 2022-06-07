import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoundKeyboardBackspace from "../Assets/Icon/RoundKeyboardBackspace";
import EmailIcon from "../Assets/Icon/Email";

function CheckEmail() {
  const [countResend, setCountResend] = useState(60);

  const email = "";

  //   const openMail = () => {
  //     // pake salah satu
  //     window.open("https://gmail.com", "_blank");
  //     // window.location = "mailto:{yourmail@domain.com}";
  //   };

  useEffect(() => {
    if (countResend > 0) {
      setTimeout(() => {
        setCountResend(countResend - 1);
      }, 1000);
    }
  });

  return (
    <div className="bg-white">
      <div className="min-h-[83vh] flex justify-center justify-items-center text-center">
        <div className="px-10">
          <div className="justify-center flex pt-[70px] md:pt-[70px] mb-2">
            <EmailIcon />
          </div>
          <div className="font-semibold text-3xl text-text1 px-10 mb-4">
            Check your email
          </div>
          <div className="container">
            <div className="font-sans font-medium text-grey ">
              We sent a password reset link to
              <br />
              {email}
            </div>
          </div>
          <div className="container pt-[10px] md:pt-[20px] ">
            {/* <form> */}
            <button
              type="submit"
              className="font-sans w-full bg-primary1 font-medium hover:bg-primary2 text-white  py-2 px-4 rounded"
              // onClick={openMail}
            >
              Open email app
            </button>

            <div className="mt-2">
              {countResend > 0 ? (
                <h5 className="text-grey font-sans">
                  Resend in
                  <span className="text-primary1 font-semibold">
                    {countResend} second
                  </span>
                </h5>
              ) : (
                <h5 className="text-sm text-grey font-sans">
                  Didn&apos;t receive the email?
                  <button type="button" className="text-primary1">
                    Click here
                  </button>
                </h5>
              )}
            </div>
            <Link
              to="/login"
              type="button"
              className="font-sans w-full font-medium text-grey py-2 px-4 flex rounded justify-center "
            >
              <RoundKeyboardBackspace />
              <span>Back to login</span>
            </Link>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckEmail;

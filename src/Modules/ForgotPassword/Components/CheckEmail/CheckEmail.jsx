/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UniversalCookie from "universal-cookie";
import { Icon } from "@iconify/react";
import Logo from "../../../../Components/Assets/Logo";

function CheckEmail() {
  const Navigate = useNavigate();
  const [countResend, setCountResend] = useState(60);
  const cookies = new UniversalCookie();
  const email = cookies.get("forgot.email");

  const openMail = () => {
    // pake salah satu
    window.open("https://gmail.com", "_blank");
    // window.location = "mailto:{yourmail@domain.com}";
  };

  const backLogin = () => {
    Navigate("/login");
  };
  useEffect(() => {
    if (countResend > 0) {
      setTimeout(() => {
        setCountResend(countResend - 1);
      }, 1000);
    }
  });

  return (
    <div className="bg-white">
      <nav className="top-0 bg-white h-14 pt-4 sm:px-10 md:pl-36 md:pr-20 font-semibold text-primary1 text-xl mt-4">
        <Logo />
      </nav>

      <div className="min-h-[83vh] flex justify-center justify-items-center text-center">
        <div className="px-10">
          <div className="justify-center flex pt-[70px] md:pt-[70px] mb-2">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="120" height="120" rx="60" fill="#F4FEFE" />
              <rect
                x="12"
                y="12"
                width="96"
                height="96"
                rx="48"
                fill="#DCFFFF"
              />
              <path
                d="M81 42.5H39C38.0717 42.5 37.1815 42.8687 36.5251 43.5251C35.8687 44.1815 35.5 45.0717 35.5 46V74C35.5 74.9283 35.8687 75.8185 36.5251 76.4749C37.1815 77.1313 38.0717 77.5 39 77.5H81C81.9283 77.5 82.8185 77.1313 83.4749 76.4749C84.1313 75.8185 84.5 74.9283 84.5 74V46C84.5 45.0717 84.1313 44.1815 83.4749 43.5251C82.8185 42.8687 81.9283 42.5 81 42.5V42.5ZM77.15 46L60 57.865L42.85 46H77.15ZM39 74V47.5925L59.0025 61.435C59.2954 61.6382 59.6435 61.7471 60 61.7471C60.3565 61.7471 60.7046 61.6382 60.9975 61.435L81 47.5925V74H39Z"
                fill="#009D9A"
              />
            </svg>
          </div>{" "}
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
            <form>
              <button
                type="submit"
                className="font-sans w-full bg-primary1 font-medium hover:bg-primary2 text-white  py-2 px-4 rounded"
                onClick={openMail}
              >
                Open email app
              </button>

              <div className="mt-2">
                {countResend > 0 ? (
                  <h5 className="text-grey font-sans">
                    Resend in{" "}
                    <span className="text-primary1 font-semibold">
                      {countResend} second
                    </span>
                  </h5>
                ) : (
                  <h5 className="text-sm text-grey font-sans">
                    Didn&apos;t receive the email?
                    <button className="text-primary1 ">
                      &nbsp;Click here
                    </button>
                  </h5>
                )}
              </div>
              <button
                type="button"
                className="font-sans w-full font-medium text-grey py-2 px-4 flex rounded justify-center "
                onClick={backLogin}
              >
                <Icon
                  className="mr-1 pb-1.5"
                  icon="ic:round-keyboard-backspace"
                  fontSize={30}
                />
                <span>Back to login</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckEmail;

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UniversalCookies from "universal-cookie";
import AlertError from "../../../../Components/Alerts/AlertError";
import { sendForgotPassword } from "../../../../Networks/ForgotPassword";
import KeyIcon from "./Assets/KeyIcon";
import Logo from "../../../../Components/Assets/Logo";

function ForgotPasswordComp() {
  const navigate = useNavigate();
  const cookies = new UniversalCookies();
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    sendForgotPassword(email, setIsError, navigate, cookies);
  };
  const backLogin = () => {
    navigate(-1);
  };

  const handleChange = (setState) => (e) => {
    setState(e.target.value);
  };

  return (
    <div className="bg-white">
      <AlertError isError={isError} setIsError={setIsError} />
      <nav className="top-0 bg-white h-14 pt-4 sm:px-10 md:pl-36 md:pr-20 font-semibold text-primary1 text-xl mt-2">
        <Logo />
      </nav>
      <div className="min-h-[83vh] flex justify-center justify-items-center ">
        <div className="px-10">
          <div className="justify-center flex pt-[70px] md:pt-[70px] mb-2">
            <KeyIcon />
          </div>{" "}
          <div className="font-semibold text-3xl text-text1 px-10 mb-4">
            Forgot password?
          </div>
          <div className="container">
            <div className="font-sans font-medium text-grey ">
              Don’t worry, we will send you an instruction
            </div>
          </div>
          <div className="container pt-[10px] md:pt-[20px] ">
            <form onSubmit={handleForgotPassword}>
              <div className="mb-8">
                <label
                  className="font-sans font-medium text-sm  text-left
                  "
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`font-sans text-xs shadow appearance-none border rounded-md h-8 w-full py-2 px-3 leading-tight mt-2 
                  focus:outline-none focus:shadow-outline`}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleChange(setEmail)}
                  required
                />
              </div>

              <button
                type="submit"
                className="font-sans w-full bg-primary1 font-medium hover:bg-primary2 text-white  py-2 px-4 rounded"
                onClick={handleForgotPassword}
              >
                Reset password
              </button>

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

export default ForgotPasswordComp;

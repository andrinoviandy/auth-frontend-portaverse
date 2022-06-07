import { useState } from "react";
import { Link } from "react-router-dom";
import AlertError from "../Alerts/AlertError";
import KeyIcon from "../Assets/Icon/KeyIcon";
import RoundKeyboardBackspace from "../Assets/Icon/RoundKeyboardBackspace";

function ForgotPasswordComp() {
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");

  //   const handleForgotPassword = (e) => {
  //     e.preventDefault();
  //     sendForgotPassword(email, setIsError, navigate, cookies);
  //   };

  //   const handleChange = (setState) => (e) => {
  //     setState(e.target.value);
  //   };

  return (
    <div className="bg-white">
      <AlertError isError={isError} setIsError={setIsError} />

      <div className="min-h-[83vh] flex justify-center justify-items-center ">
        <div className="px-10">
          <div className="justify-center flex pt-[70px] md:pt-[70px] mb-2">
            <KeyIcon />
          </div>
          <div className="font-semibold text-3xl text-text1 px-10 mb-4">
            Forgot password?
          </div>
          <div className="container">
            <div className="font-sans font-medium text-grey ">
              Don’t worry, we will send you an instruction
            </div>
          </div>
          <div className="container pt-[10px] md:pt-[20px] ">
            <form onSubmit={() => alert("handle forgot pass")}>
              <div className="mb-8">
                <label
                  className="font-sans font-medium text-sm  text-left"
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
                  //   onChange={handleChange(setEmail)}
                  required
                />
              </div>

              <button
                type="submit"
                className="font-sans w-full bg-primary1 font-medium hover:bg-primary2 text-white  py-2 px-4 rounded"
              >
                Reset password
              </button>

              <Link
                to="/login"
                type="button"
                className="font-sans w-full font-medium text-grey py-2 px-4 flex rounded justify-center "
              >
                <RoundKeyboardBackspace />
                <span>Back to login</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordComp;

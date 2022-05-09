/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Logo from "../../../../Components/Assets/Logo";
import { postLogin } from "../../../../Networks/Login";
import LoadingButton from "./Assets/LoadingButton";
import Footer from "../../../../Components/Assets/Footer";

function Login() {
  const Navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cookies = new Cookies();
  const rememberEmail = cookies.get("email");
  const token = cookies.get("kms.session.token");
  const forgotPassword = () => {
    Navigate("/forgot-password");
  };

  useEffect(() => {
    setEmail(rememberEmail);
    if (rememberEmail) {
      setIsRemember(true);
    }
    if (token) {
      Navigate("/redirect");
    }
  }, []);

  const HandleIsShow = () => {
    setIsShow(!isShow);
  };

  const HandleChange = (set) => (e) => {
    set(e.target.value);
    setTimeout(() => {
      if (error) {
        setError(false);
      }
    }, 3000);
  };

  const handleChangeRemember = () => {
    setIsRemember(!isRemember);
  };

  const HandleLogin = (e) => {
    e.preventDefault();
    postLogin(
      email,
      password,
      isRemember,
      setIsLoading,
      setError,
      setPassword,
      Navigate,
    );
  };

  return (
    <div className="bg-white flex-col justify-between h-screen ">
      <nav className="top-0 bg-white h-14 pt-4 sm:px-10 md:pl-36 md:pr-20 font-semibold text-primary1 text-xl mt-2">
        <Logo />
      </nav>

      <div className="  ">
        <div>
          <div className="text-center mt-[8rem]">
            <h2 className="font-semibold text-4xl text-text1">
              Welcome to
            </h2>
            <h1 className=" font-semibold text-5xl pt-2 text-primary1">
              SMART SYSTEM
            </h1>
          </div>
          <div className=" flex flex-row justify-center">
            <div className="mt-[3rem]">
              <div className="w-[350px] pt-[10px] p-10 border-2 rounded-md shadow-md ">
                <form className="mt-6" onSubmit={HandleLogin}>
                  <div className="mb-3">
                    <label
                      className={`font-sans block font-medium text-sm mb-1 ${
                        error ? "text-red-600" : "text-text1"
                      }`}
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className={`font-sans  text-xs shadow appearance-none border rounded-md h-8 w-full  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                        error ? "border-red-600" : "border-grey"
                      }`}
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={HandleChange(setEmail)}
                    />
                  </div>
                  <div className="">
                    <label
                      className={`font-sans block font-medium text-sm mb-1 ${
                        error ? "text-red-600" : "text-text1"
                      }`}
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 right-0 flex items-center px-2">
                        <input
                          className="hidden js-password-toggle"
                          id="toggle"
                          type="checkbox"
                          onClick={HandleIsShow}
                        />
                        <label
                          className=" rounded px-2 py-1 text-sm  font-mono cursor-pointer js-password-label"
                          htmlFor="toggle"
                        >
                          {isShow ? (
                            <Icon
                              icon="mdi:eye-outline"
                              fontSize={18}
                            />
                          ) : (
                            <Icon
                              icon="mdi:eye-off-outline"
                              color="#878D96"
                              fontSize={18}
                            />
                          )}
                        </label>
                      </div>
                      <input
                        className={`font-sans  text-xs shadow appearance-none border rounded-md h-8 w-full  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                          error ? "border-red-600" : "border-grey"
                        }`}
                        id="password"
                        type={isShow ? "text" : "password"}
                        autoComplete="off"
                        placeholder="Password"
                        value={password}
                        onChange={HandleChange(setPassword)}
                      />
                    </div>
                    {error ? (
                      <span className="text-xs font-sans text-red-600 font-medium">
                        Incorrect email or password
                      </span>
                    ) : (
                      <br />
                    )}
                  </div>
                  <div className="flex justify-between mb-2 ">
                    <label>
                      <input
                        className="mr-2 form-checkbox accent-primary1"
                        style={{ zoom: "0.9" }}
                        type="checkbox"
                        value={isRemember}
                        onChange={handleChangeRemember}
                        checked={!!isRemember}
                      />
                      <span className="font-sans text-[12px]  font-medium  ">
                        Remember me
                      </span>
                    </label>
                    <button type="button">
                      {" "}
                      <span
                        className="text-primary1 font-sans text-xs"
                        onClick={forgotPassword}
                      >
                        {" "}
                        Forgot password?{" "}
                      </span>
                    </button>
                  </div>

                  {isLoading ? (
                    <button
                      disabled
                      type="button"
                      className="font-sans w-full bg-primary1 font-medium  text-white  py-2 px-4 rounded"
                    >
                      <LoadingButton />
                      Loading...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="font-sans w-full bg-primary1 font-medium hover:bg-primary2 text-white  py-2 px-4 rounded"
                    >
                      Sign in
                    </button>
                  )}

                  <button
                    type="button"
                    className="font-sans w-full  font-medium text-primary2 hover:text-primary1 py-2 px-4 rounded"
                  >
                    Enter as guest
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-[3rem]">
        <Footer />
      </div>
    </div>
  );
}

export default Login;

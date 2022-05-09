/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from "react-router-dom";
import UniversalCookies from "universal-cookie";
import Footer from "../../../Components/Assets/Footer";
import Logo from "../../../Components/Assets/Logo";

function HomeComp() {
  const navigate = useNavigate();
  const cookies = new UniversalCookies();
  const token = cookies.get("kms.session.token");
  return (
    <div>
      <nav className="top-0 bg-white h-14 pt-4 sm:px-10 md:pl-36 md:pr-20 font-semibold text-primary1 text-xl mt-2">
        <Logo />
      </nav>
      <div className="flex flex-col justify-between h-[94vh]">
        <div>
          <div className="text-center pt-[8rem]">
            <h2 className="font-semibold text-4xl text-text1">
              Welcome to
            </h2>
            <h1 className=" font-semibold text-5xl pt-2 text-primary1">
              SMART SYSTEM
            </h1>
            <div className=" flex-row justify-center m-auto  max-w-[450px] pt-[1.5rem]">
              <h4 className="font-sans text-lg justify-center text-darkGrey ">
                Increase productivity through a clear understanding of
                strategic activities and ease of access to your most
                crucial knowledge.
              </h4>
            </div>

            <div className="mt-[3rem]">
              {token ? (
                <div className="flex justify-center mt-[1.5rem]">
                  <div className="flex flex-row justify-evenly">
                    {" "}
                    <div
                      className="m-10 p-[3.5rem] bg-bg1 cursor-pointer"
                      onClick={() =>
                        window.location.replace(
                          import.meta.env.VITE_KMS_URL,
                        )
                      }
                    >
                      <h1 className=" font-semibold text-3xl  text-primary1">
                        KMS
                      </h1>
                    </div>
                    <div
                      className="m-10 p-[3.5rem] bg-bg1 cursor-pointer"
                      onClick={() =>
                        window.location.replace(
                          import.meta.env.VITE_KMS_URL,
                        )
                      }
                    >
                      <h1 className=" font-semibold text-3xl  text-primary1">
                        LMS
                      </h1>
                    </div>
                    <div
                      className="m-10 p-[3.5rem] bg-bg1 cursor-pointer"
                      onClick={() =>
                        window.location.replace(
                          import.meta.env.VITE_KMS_URL,
                        )
                      }
                    >
                      <h1 className=" font-semibold text-3xl  text-primary1">
                        TMS
                      </h1>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  className="px-[8rem] rounded-sm py-1 text-white font-sans bg-primary1"
                  type="button"
                  onClick={() => navigate("login")}
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HomeComp;

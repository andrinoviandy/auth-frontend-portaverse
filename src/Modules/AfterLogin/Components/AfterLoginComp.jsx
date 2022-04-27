/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Logo from "../../../Components/Assets/Logo";

function AfterLoginComp() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <nav className="top-0 bg-white h-14 pt-4 sm:px-10 md:pl-36 md:pr-20 font-semibold text-primary1 text-xl mt-2">
          <Logo />
        </nav>
        <div>
          <div className="text-center pt-[8rem]">
            <h2 className="font-semibold text-3xl text-text1">
              Choose Our
            </h2>
            <h1 className=" font-semibold text-5xl pt-2 text-primary1">
              PRODUCT
            </h1>
          </div>
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
        </div>
      </div>
      <div>
        <h5 className=" text-center text-grey pb-[2rem]">
          Powered by KMPlus Consulting 2022
        </h5>
      </div>
    </div>
  );
}

export default AfterLoginComp;

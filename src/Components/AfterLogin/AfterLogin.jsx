import { Link } from "react-router-dom";

export default function AfterLogin() {
  return (
    <div className="flex flex-col justify-between h-screen">
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
          <Link to={import.meta.env.VITE_KMS_URL}>
            <div className="m-10 p-[3.5rem] bg-bg1 cursor-pointer">
              <h1 className=" font-semibold text-3xl  text-primary1">
                KMS
              </h1>
            </div>
          </Link>

          <Link to={import.meta.env.VITE_LMS_URL}>
            <div className="m-10 p-[3.5rem] bg-bg1 cursor-pointer">
              <h1 className=" font-semibold text-3xl  text-primary1">
                LMS
              </h1>
            </div>
          </Link>

          <Link to={import.meta.env.VITE_TMS_URL}>
            <div className="m-10 p-[3.5rem] bg-bg1 cursor-pointer">
              <h1 className=" font-semibold text-3xl  text-primary1">
                TMS
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

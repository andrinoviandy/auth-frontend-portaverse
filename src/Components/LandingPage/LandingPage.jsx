import { Link } from "react-router-dom";
import userAuthorization from "../../Utils/Helpers/userAuthorization";
import PortaverseLogo from "../Assets/Pictures/PortaverseLogo.png";
import Products from "../ChooseProducts/Products";

function LandingPage() {
  const { isAuthorized } = userAuthorization();
  if (isAuthorized) {
    window.location.href = `${import.meta.env.VITE_KMS_URL}/home`;
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center pt-20">
      <img
        src={PortaverseLogo}
        alt="company_logo"
        className="h-[100px]"
      />
      {/* <p className="font-semibold text-4xl text-text1">Welcome to</p>
      <p className="font-semibold text-5xl py-2 text-primary1">
        portaverse
      </p> */}
      <div className="flex-row justify-center m-auto w-[450px] pb-[1.5rem]">
        <p className="font-secondary text-lg text-darkGray ">
          Increase productivity through a clear understanding of
          strategic activities and ease of access to your most crucial
          knowledge.
        </p>
      </div>

      {isAuthorized ? (
        <Products />
      ) : (
        <div className="my-10">
          <Link
            to="/login"
            className="px-36 rounded-md py-2 text-white font-secondary bg-primary1 hover:bg-primary2"
            type="button"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default LandingPage;

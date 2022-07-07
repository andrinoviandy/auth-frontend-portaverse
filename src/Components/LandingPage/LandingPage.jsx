import { Link } from "react-router-dom";
import userAuthorization from "../../Utils/Helpers/userAuthorization";
import Products from "../ChooseProducts/Products";

function LandingPage() {
  const { isAuthorized } = userAuthorization();
  return (
    <div className="text-center">
      <p className="font-semibold text-4xl text-text1">Welcome to</p>
      <p className="font-semibold text-5xl py-2 text-primary1">
        SMART SYSTEM
      </p>
      <div className="flex-row justify-center m-auto w-[450px] py-[1.5rem]">
        <p className="font-sans text-lg text-darkGray ">
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
            className="px-36 rounded-md py-2 text-white font-sans bg-primary1 hover:bg-primary2"
            type="button"
          >
            Logon
          </Link>
        </div>
      )}
    </div>
  );
}

export default LandingPage;

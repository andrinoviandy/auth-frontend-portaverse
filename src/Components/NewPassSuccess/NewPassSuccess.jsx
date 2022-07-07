import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Check from "../Assets/Icon/Check";

export default function NewPassSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    // redirect when not on application flow
    if (state?.status !== "resetPasswordSuccess") {
      navigate("/login", { replace: true });
    }
  }, [state]);

  return (
    <div className="grid justify-items-center">
      <Check />

      <div className="text-center">
        <h1 className="font-semibold text-3xl text-text1 my-5">
          Password reset
        </h1>
        <p className="font-sans font-medium text-gray">
          Your password has been successfully reset.
          <br />
          Click below to login page
        </p>
      </div>

      <div className="w-[22rem] mt-7">
        <Link
          to="/login"
          className="flex justify-center font-sans bg-primary1 font-medium hover:bg-primary2 text-white py-2 px-4 rounded my-1.5"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}

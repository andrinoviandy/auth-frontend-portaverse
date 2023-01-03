import { Link, Navigate, useLocation } from "react-router-dom";
import Check from "../../Components/Assets/Icon/Check";

export default function NewPassSuccess() {
  const { state } = useLocation();

  if (!state) return <Navigate to="/login" replace />;

  return (
    <div className="grid justify-items-center">
      <Check />

      <div className="text-center">
        <h1 className="font-semibold text-3xl text-text1 my-5">
          Password reset
        </h1>
        <p className="font-secondary font-medium text-gray">
          Your password has been successfully reset.
          <br />
          Click below to login page
        </p>
      </div>

      <div className="w-[22rem] mt-7">
        <Link
          to="/login"
          className="flex justify-center font-secondary bg-primary1 font-medium hover:bg-primary2 text-white py-2 px-4 rounded my-1.5"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}

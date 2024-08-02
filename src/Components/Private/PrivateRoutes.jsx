import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import hasRole from "../../Utils/Helpers/hasRole";

export default function PrivateRoutes({ isAuthorized, redirect }) {
  const { pathname } = useLocation();
  const url = pathname.split("/")[1];

  const isExternalJudge = hasRole(["XTNL"]);
  if (isExternalJudge) {
    window.location = `${
      import.meta.env.VITE_IMS_URL
    }/competition-management-system`;
    return null;
  }

  if (isAuthorized && url === "products") {
    return <Outlet />;
  }
  if (isAuthorized && url === "referals") {
    return <Outlet />;
  }

  if (!isAuthorized && url === "products") {
    return <Navigate to={redirect} replace />;
  }

  if (isAuthorized) {
    // <Navigate to={redirect} replace />
    window.location.href = redirect;
    return null;
  }

  return <Outlet />;
}

PrivateRoutes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isAuthorized: PropTypes.bool.isRequired,
  redirect: PropTypes.string.isRequired,
};

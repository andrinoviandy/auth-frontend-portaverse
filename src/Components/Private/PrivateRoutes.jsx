import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoutes({ isAuthorized, redirect }) {
  const { pathname } = useLocation();
  const url = pathname.split("/")[1];

  if (isAuthorized && url === "products") {
    return <Outlet />;
  }

  if (!isAuthorized && url === "products") {
    return <Navigate to={redirect} replace />;
  }

  return isAuthorized ? (
    <Navigate to={redirect} replace />
  ) : (
    <Outlet />
  );
}

PrivateRoutes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isAuthorized: PropTypes.bool.isRequired,
  redirect: PropTypes.string.isRequired,
};

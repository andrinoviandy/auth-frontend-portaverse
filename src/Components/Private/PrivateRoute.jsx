import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({
  isAllowed,
  redirectPath = "/login",
  children,
}) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children || <Outlet />;
}

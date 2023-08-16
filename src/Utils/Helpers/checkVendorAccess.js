import { useParams } from "react-router-dom";
import getUserCookie from "./getUserCookie";
import hasRole from "./hasRole";

const checkVendorAccess = () => {
  const user = getUserCookie();
  const { vendorId } = useParams();
  if (+vendorId !== user?.vendor?.vendor_id && hasRole(["VNDR"])) {
    window.location = `${
      import.meta.env.VITE_LMS_URL
    }/vendor-management/${user?.vendor?.vendor_id}`;
  }
};

export default checkVendorAccess;

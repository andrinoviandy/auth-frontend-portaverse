import { useParams } from "react-router-dom";
import getUserCookie from "./getUserCookie";

const checkSubconAccess = () => {
  const user = getUserCookie();
  const { subconId } = useParams();
  if (
    +subconId !== user?.subcon?.subcon_id &&
    user?.role_code === "SBCN"
  ) {
    window.location = `${
      import.meta.env.VITE_LMS_URL
    }/subcon-management/${user?.subcon?.subcon_id}`;
  }
};

export default checkSubconAccess;

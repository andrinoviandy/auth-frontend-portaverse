import { useParams } from "react-router-dom";
import getUserCookie from "./getUserCookie";
import hasRole from "./hasRole";

const checkSubconAccess = () => {
  const user = getUserCookie();
  const { subconId } = useParams();
  if (+subconId !== user?.subcon?.subcon_id && hasRole(["SBCN"])) {
    window.location = `${
      import.meta.env.VITE_LMS_URL
    }/subcon-management/${user?.subcon?.subcon_id}`;
  }
};

export default checkSubconAccess;

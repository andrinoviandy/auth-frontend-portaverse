import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "../../dependencies/firebase/firebase";

const handleLogout = () => {
  const cookies = new Cookies();
  signOut(auth)
    .then(() => {
      cookies.remove("auth");
      cookies.remove("kmsAuth");
      window.location.href = "/login";
    })
    .catch((error) => {
      console.log(error);
    });
};

export default handleLogout;

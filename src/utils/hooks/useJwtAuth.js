import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

const useJwtAuth = () => {
  const cookies = new Cookies();
  const cookiesAll = cookies.getAll();
  const token = cookiesAll.kmsAuth;
  const fbAuth = cookiesAll.auth.stsTokenManager.accessToken;
  const decoded = jwt_decode(token);

  let res = {
    decoded: decoded,
    kmsAuth: token,
    fbAuth: fbAuth,
  };

  return res;
};

export default useJwtAuth;

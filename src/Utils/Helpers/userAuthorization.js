import Cookies from "js-cookie";

export default function userAuthorization() {
  const userCookie = Cookies.get("user");
  if (!userCookie) {
    return { isAuthorized: false, user: undefined };
  }

  const user = JSON.parse(userCookie.replace(/^j:/, ""));

  if (user.expire_token < new Date() / 1000) {
    return { isAuthorized: false, user };
  }

  return { isAuthorized: true, user };
}

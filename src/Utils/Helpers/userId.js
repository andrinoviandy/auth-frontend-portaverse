import getUserCookie from "./getUserCookie";

const userId = (roles = []) => {
  const user = getUserCookie(); 
  if (!user) return null;
  const userIds = user.user_id;

  if (roles.length > 0) {
    const hasRole = user.role_code.some((role) =>
      roles.includes(role),
    );
    if (!hasRole) {
      return null; 
    }
  }

  return userIds; 
};

export default userId;

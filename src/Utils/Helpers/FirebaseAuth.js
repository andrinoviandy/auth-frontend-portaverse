import {
  confirmPasswordReset,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import auth from "../../Configs/Firebase";

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  return signOut(auth);
};

const setNewPassword = (actionCode, newPassword) => {
  return confirmPasswordReset(auth, actionCode, newPassword);
};

export { login, logout, setNewPassword };

import {
  confirmPasswordReset,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../Configs/Firebase";

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const setNewPassword = (actionCode, newPassword) => {
  return confirmPasswordReset(auth, actionCode, newPassword);
};

export { login, setNewPassword };

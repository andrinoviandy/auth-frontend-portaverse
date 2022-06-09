import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../../Dependencies/Firebase";

// TODO

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  return signOut(auth);
};

export { login, logout };

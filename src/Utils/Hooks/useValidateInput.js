function validateEmail(email) {
  if (!email.trim()) {
    return "Email is required";
  }

  if (
    email.search(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    ) < 0
  ) {
    return "Email is invalid";
  }

  return "";
}

function validatePassword(password) {
  if (!password.trim()) {
    return "Password is required";
  }

  return "";
}

function validateNewPassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (password.search(/[a-z]/i) < 0) {
    return "Password must contain at least one letter";
  }

  if (password.search(/[A-Z]/) < 0) {
    return "Password must contain at least one uppercase letter";
  }

  if (password.search(/[0-9]/) < 0) {
    return "Password must contain at least one number";
  }

  if (password.search(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) < 0) {
    return "Password must contain at least one special character";
  }

  return "";
}

export default function useValidateInput(type, value) {
  if (type === "email") {
    return validateEmail(value);
  }

  if (type === "password") {
    return validatePassword(value);
  }

  if (type === "newPassword") {
    return validateNewPassword(value);
  }

  return "";
}

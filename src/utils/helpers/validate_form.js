export const validateForm = (
  name,
  value,
  errorMsg,
  form = undefined,
  exceptionProp = [],
) => {
  const messages = { ...errorMsg };
  if (form) {
    for (const key in form) {
      if (
        (form[key] === null ||
          form[key].length === 0 ||
          form[key] === 0) &&
        !exceptionProp.includes(key)
      ) {
        key === "file"
          ? (messages[key] = "File is required")
          : (messages[key] = "Field cannot be empty");
      }
    }
  } else {
    if (
      (value === "" || value === 0) &&
      !exceptionProp.includes(name)
    ) {
      messages[name] = "Field cannot be empty";
    } else {
      delete messages[name];
    }
  }

  return messages;
};

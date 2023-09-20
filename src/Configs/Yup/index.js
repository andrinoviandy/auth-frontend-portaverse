/* eslint-disable no-template-curly-in-string */
import * as Yup from "yup";

const globalMessages = {
  default: "Invalid value",
  required: "This field is required",
};

export const customMessages = {
  mixed: {
    ...globalMessages,
    oneOf: "Invalid field value",
  },
  string: {
    ...globalMessages,
    email: "Value must be a valid email address",
    url: "Value must be a valid URL",
  },
  number: {
    ...globalMessages,
    min: ({ min }) => `Value must be greater than or equal to ${min}`,
    max: ({ max }) => `Value must be less than or equal to ${max}`,
    moreThan: ({ more }) => `Value must be greater than ${more}`,
    integer: "Value must be an integer",
    positive: "Value must be a positive number",
  },
  date: {
    ...globalMessages,
    min: ({ min }) => `Value must be greater than or equal to ${min}`,
    max: ({ max }) => `Value must be less than or equal to ${max}`,
  },
  boolean: {
    ...globalMessages,
  },
  array: {
    ...globalMessages,
    min: ({ min }) =>
      `This field must have length greater than or equal to ${min}`,
    max: ({ max }) =>
      `This field must have length less than or equal to ${max}`,
  },
};

Yup.setLocale(customMessages);

export default Yup;

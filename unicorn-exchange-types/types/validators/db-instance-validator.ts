import * as yup from "yup";

export const dbInstanceValidationScheme = {
  id: yup
    .number()
    .min(0)
    .required(),
};

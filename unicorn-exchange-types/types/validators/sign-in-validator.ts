import * as yup from "yup";
import {signInFields} from "../enums/forms/sign-in";

export const signInValidationScheme = {
  [signInFields.email]: yup
    .string()
    .email()
    .nullable()
    .required(),
  [signInFields.password]: yup
    .string()
    .nullable()
    .required(),
};

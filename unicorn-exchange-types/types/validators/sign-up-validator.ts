import * as yup from "yup";
import {signUpFields} from "../enums/forms/sign-up";

export const signUpValidationScheme = {
  [signUpFields.username]: yup
    .string()
    .min(3)
    .nullable()
    .required(),
  [signUpFields.email]: yup
    .string()
    .email()
    .nullable()
    .required(),
  [signUpFields.password]: yup
    .string()
    .min(3)
    .nullable()
    .required(),
};

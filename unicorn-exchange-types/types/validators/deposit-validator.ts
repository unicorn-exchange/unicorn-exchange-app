import * as yup from "yup";
import {userDepositFields} from "../enums/forms/user-deposit";

export const userDepositValidationScheme = {
  [userDepositFields.blockchainId]: yup
    .number()
    .positive()
    .required(),
  [userDepositFields.amount]: yup
    .number()
    .positive()
    .required(),
};

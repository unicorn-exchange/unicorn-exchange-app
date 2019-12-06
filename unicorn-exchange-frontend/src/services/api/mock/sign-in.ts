import {commonRes} from "./common-res";
import {ISignInRes} from "../../../../../unicorn-exchange-types/types/api/responses";

export const signIn: ISignInRes = {
  token: "token",
  errors: [],
  ...commonRes,
};

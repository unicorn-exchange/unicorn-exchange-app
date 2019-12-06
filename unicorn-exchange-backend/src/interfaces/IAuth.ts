import {ISignInUserReq, ISignUpUserReq} from "../../../unicorn-exchange-types/types/api/requests";
import {ISignInUserRes} from "../../../unicorn-exchange-types/types/api/responses";
import {QueryInterfaceOptions} from "sequelize";

interface IAuthResponse {
  user?: ISignInUserRes;
  token?: string;
}

export interface IDecodedTokenObj {
  userId: number;
  exp: number;
  iat: number;
}

export interface IAuth {
  signIn(user: ISignInUserReq): Promise<IAuthResponse>;

  // TODO: QueryInterfaceOptions should not be in general IAuth
  signUp(user: ISignUpUserReq, options?: QueryInterfaceOptions): Promise<IAuthResponse>;
}

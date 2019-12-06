import {userDepositFields} from "../enums/forms/user-deposit";
import {paginationFields} from "../enums/forms/pagination";
import {IOrderWriteDTO} from "./dtos";

export interface IPagination {
  [paginationFields.limit]: number;
  [paginationFields.offset]: number;
}

export interface IOrdersReq extends IPagination, Partial<IOrderWriteDTO> {
}

export interface ISignInUserReq {
  email: string;
  password: string;
}

export interface ISignUpUserReq extends ISignInUserReq {
  username: string;
}

export interface IDepositReq {
  [userDepositFields.blockchainId]: number;
  [userDepositFields.amount]: number;
}

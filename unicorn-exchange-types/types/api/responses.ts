import {ISignUpUserReq} from "./requests";
import {ValidationError} from "yup";
import {
  ICountryDTO,
  ICryptoCurrencyDTO,
  IDBInstance,
  IFiatDTO,
  IFullOrderDTO,
  IOrderWriteDTO,
  IPartOrderDTO,
  IPaymentMethodDTO,
} from "./dtos";

export interface ICommonRes {
  ok: boolean;
  errors?: ValidationError[];
}

export interface ISignInUserWithTokenRes {
  token: string;
}

export interface ISignInUserRes extends ISignUpUserReq, IDBInstance {
}

export interface ISettingsCommonRes extends ICommonRes {
  cryptoCurrencies: ICryptoCurrencyDTO[];
  fiats: IFiatDTO[];
  countries: ICountryDTO[];
  paymentMethods: IPaymentMethodDTO[];
}

export interface ISignUpRes extends ICommonRes {
  token?: string;
}

export interface ISignInRes extends ICommonRes {
  token?: string;
}

export interface IOrdersCreateRes extends ICommonRes, IDBInstance {
  payload?: IOrderWriteDTO;
}

export interface IOrderRes extends ICommonRes {
  payload?: IFullOrderDTO;
}

export interface IOrdersRes extends ICommonRes {
  payload?: IPartOrderDTO[];
  count: number;
}

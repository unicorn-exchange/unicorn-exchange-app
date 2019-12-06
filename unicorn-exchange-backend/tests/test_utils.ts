import {IEnv} from "../src/env";
import {IBaseContext} from "../src/interfaces/IContext";
import {defaultLogger} from "../src/utils/logger";
import {ISignUpUserReq} from "../src/types/api/requests";
import {orderCommonFields, orderWriteFields} from "../src/types/enums/forms/order";
import {IOrderWriteDTO, IUserDTO} from "../src/types/api/dtos";
import {initModels} from "../src/services/db";
import {Sequelize} from "sequelize-typescript";
import {CurrencyTypes} from "../src/types/enums/currency-types";
import {UserModel} from "../src/types/models/user.model";

export function beforeAllCommon(db: Sequelize) {
  jest.setTimeout(30000);
  return initModels(db, mockEnv).then(db => db.transaction());
}

export const mockEnv: IEnv = {
  BLOCKCHAIN_NETWORK: "test",
  DB_HOST: "",
  DB_NAME: "",
  DB_PASSWORD: "",
  DB_USERNAME: "",
  SQLITE_STORAGE_FILE: "./tests/db_test.sqlite",
  DB_DIALECT: "sqlite",
  IS_PRODUCTION: false,
  IS_FORCE_DB_SYNC: false,
  REDIS_HOST: "localhost",
  REDIS_PORT: 6379,
  REDIS_NAME: "redis_test",
  REDIS_USERNAME: "redis_test",
  REDIS_PASSWORD: "redis_test",
  JWT_SECRET: "secret",
  PORT: 3000,
};

export const mockUserInvalid: ISignUpUserReq = {
  email: "invalid",
  password: "invalid",
  username: "invalid",
};

export const mockUserValid1: IUserDTO = {
  id: 1,
  email: "test1@google.com",
  password: "password1",
  username: "username1",
  rating: 3,
  dealsCount: 0,
};

export const mockUserValid2: IUserDTO = {
  id: 2,
  email: "test2@google.com",
  password: "password2",
  username: "username2",
  rating: 0,
  dealsCount: 0,
};

export const mockUserModel = {id: 1} as UserModel;

export const mockOrderCreateValid: IOrderWriteDTO = {
  [orderWriteFields.countryId]: 1,
  [orderCommonFields.currencySell]: {
    id: 1,
    title: "string",
    type: CurrencyTypes.fiat,
  },
  [orderCommonFields.currencySellPrice]: 1,
  [orderCommonFields.currencyBuy]: {
    id: 1,
    title: "string",
    type: CurrencyTypes.cryptoCurrency,
  },
  [orderCommonFields.currencyBuyPrice]: 1,
  [orderWriteFields.paymentMethodId]: 1,
  [orderCommonFields.bankName]: "string",
  [orderCommonFields.marginProfit]: 1,
  [orderCommonFields.isAutoAdjustTransactionLimit]: true,
  [orderCommonFields.termsOfTrade]: "string",
  [orderCommonFields.isVerifiedUsersOnly]: true,
  [orderCommonFields.isTrustedUsersOnly]: true,
  [orderCommonFields.isIdentifyUsersBeforeContinueTrade]: true,
};

export const mockBaseCtx: IBaseContext = {
  logger: defaultLogger,
  env: mockEnv,
};

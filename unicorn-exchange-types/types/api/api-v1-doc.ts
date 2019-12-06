import {
  ICommonRes,
  IOrderRes,
  IOrdersCreateRes,
  IOrdersRes,
  ISettingsCommonRes,
  ISignInRes,
  ISignInUserRes,
  ISignInUserWithTokenRes,
  ISignUpRes,
} from "./responses";
import {IDepositReq, IOrdersReq, ISignInUserReq, ISignUpUserReq} from "./requests";
import {IDBInstance, IOrderWriteDTO} from "./dtos";

export const USERS_ME = "/users/me";
export const USERS_DEPOSIT = "/users/deposit";

// Auth
export const AUTH_SIGN_UP = "/auth/sign-up";
export const AUTH_SIGN_IN = "/auth/sign-in";

// Settings
export const SETTINGS = "/settings";
export const SETTINGS_COMMON = "/settings/common";

// Orders
export const ORDERS_GET_ALL = "/orders";
export const ORDERS_GET_ONE = "/orders/:id";
export const ORDERS_CREATE = "/orders/create";
export const ORDERS_REQUEST = "/orders/request";
export const ORDERS_CONFIRM = "/orders/confirm";
export const ORDERS_DECLINE = "/orders/decline";

export interface APIV1Doc {
  [USERS_ME]: {
    GET: {
      head: ISignInUserWithTokenRes;
      response: ISignInUserRes;
    };
  };

  [USERS_DEPOSIT]: {
    POST: {
      head: ISignInUserWithTokenRes;
      body: IDepositReq;
      response: ICommonRes;
    };
  };

  [AUTH_SIGN_UP]: {
    POST: {
      body: ISignUpUserReq;
      response: ISignUpRes;
    };
  };

  [AUTH_SIGN_IN]: {
    POST: {
      body: ISignInUserReq;
      response: ISignInRes;
    };
  };

  [SETTINGS]: {
    GET: {
      response: ICommonRes;
    };
  };

  [SETTINGS_COMMON]: {
    GET: {
      head: ISignInUserWithTokenRes;
      response: ISettingsCommonRes;
    };
  };

  [ORDERS_GET_ALL]: {
    GET: {
      query: IOrdersReq;
      response: IOrdersRes;
    };
  };

  [ORDERS_GET_ONE]: {
    GET: {
      params: IDBInstance;
      response: IOrderRes;
    };
  };

  [ORDERS_CREATE]: {
    POST: {
      body: IOrderWriteDTO;
      response: IOrdersCreateRes;
    };
  };

  [ORDERS_REQUEST]: {
    GET: {
      query: IDBInstance;
      response: IOrderWriteDTO;
    };
  };

  [ORDERS_CONFIRM]: {
    POST: {
      body: IDBInstance;
      response: ICommonRes;
    };
  };

  [ORDERS_DECLINE]: {
    POST: {
      body: IDBInstance;
      response: ICommonRes;
    };
  };
}

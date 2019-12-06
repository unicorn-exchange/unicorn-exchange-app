import MockAdapter from "axios-mock-adapter";
import {AxiosInstance} from "axios";
import {
  AUTH_SIGN_IN,
  AUTH_SIGN_UP,
  ORDERS_CONFIRM,
  ORDERS_CREATE,
  ORDERS_DECLINE,
  ORDERS_GET_ALL,
  ORDERS_GET_ONE,
  SETTINGS_COMMON
} from "../../../../../unicorn-exchange-types/types/api/api-v1-doc";
import {settingsCommonRes} from "./settings-common-res";
import {commonRes} from "./common-res";
import {ordersRes} from "./orders-res";
import {orderRes} from "./order-res";
import {messages} from "./messages";

export function mockAPIV1Requests(api: AxiosInstance) {
  const transport = new MockAdapter(api);

  transport.onGet(SETTINGS_COMMON).reply(200, settingsCommonRes);
  transport.onGet(ORDERS_GET_ALL).reply(200, ordersRes);
  transport.onGet(ORDERS_GET_ONE).reply(200, orderRes);
  transport.onPost(ORDERS_CONFIRM).reply(200, commonRes);
  transport.onPost(ORDERS_DECLINE).reply(200, commonRes);
  transport.onPost("change/password").reply(200, commonRes);
  transport.onGet("messages").reply(200, messages);
  transport.onPost(ORDERS_CREATE).reply(200, commonRes);
  transport.onPost(AUTH_SIGN_IN).reply(200, commonRes);
  transport.onPost(AUTH_SIGN_UP).reply(200, commonRes);
}

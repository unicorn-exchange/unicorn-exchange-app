import {IOrdersRes} from "../../../../../unicorn-exchange-types/types/api/responses";
import {order} from "./order";
import {commonRes} from "./common-res";

export const ordersRes: IOrdersRes = {
  count: 1,
  payload: [order],
  ...commonRes
};

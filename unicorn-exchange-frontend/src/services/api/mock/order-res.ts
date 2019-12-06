import {IOrderRes} from "../../../../../unicorn-exchange-types/types/api/responses";
import {order} from "./order";

export const orderRes: IOrderRes = {
  ok: true,
  payload: order,
};

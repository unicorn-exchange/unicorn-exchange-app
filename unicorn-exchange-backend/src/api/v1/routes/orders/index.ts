import {Router} from "express";
import RestypedRouter from "restyped-express-async-middleware";
import {
  APIV1Doc,
  ORDERS_CONFIRM,
  ORDERS_CREATE,
  ORDERS_DECLINE,
  ORDERS_GET_ALL,
  ORDERS_GET_ONE,
  ORDERS_REQUEST,
} from "../../../../../../unicorn-exchange-types/types/api/api-v1-doc";
import {ordersCreateCtr} from "./orders-create.ctr";
import {ordersConfirmCtr} from "./orders-confirm.ctr";
import {ordersRequestCtr} from "./orders-request.ctr";
import {ordersDeclineCtr} from "./orders-decline.ctr";
import {ordersGetAllCtr} from "./orders-get-all.ctr";
import {ordersGetOneCtr} from "./orders-get-one.ctr";
import {attachCurrentUser} from "../../../middlewares/attachCurrentUser";
import {isAuth} from "../../../middlewares/isAuth";

export function ordersRouter(parentRouter: Router) {
  const router = RestypedRouter<APIV1Doc>(parentRouter);

  router.get(ORDERS_GET_ONE, async req => ordersGetOneCtr(req.user, req.params), isAuth, attachCurrentUser);
  router.get(ORDERS_GET_ALL, async req => ordersGetAllCtr(req.user, req.query), isAuth, attachCurrentUser);
  router.post(ORDERS_CREATE, async req => ordersCreateCtr(req.user, req.body), isAuth, attachCurrentUser);
  router.get(ORDERS_REQUEST, async req => ordersRequestCtr(req.user, req.query), isAuth, attachCurrentUser);
  router.post(ORDERS_CONFIRM, async req => ordersConfirmCtr(req.user, req.body), isAuth, attachCurrentUser);
  router.post(ORDERS_DECLINE, async req => ordersDeclineCtr(req.user, req.body), isAuth, attachCurrentUser);
}

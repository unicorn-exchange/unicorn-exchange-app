import {Router} from "express";
import RestypedRouter from "restyped-express-async-middleware";
import {APIV1Doc, USERS_DEPOSIT, USERS_ME} from "../../../../../../unicorn-exchange-types/types/api/api-v1-doc";
import {usersMeCtr} from "./users-me";
import {isAuth} from "../../../middlewares/isAuth";
import {usersDepositCtr} from "./users-deposit";

export function usersRouter(parentRouter: Router) {
  const router = RestypedRouter<APIV1Doc>(parentRouter);

  router.get(USERS_ME, async req => usersMeCtr(req.token), isAuth);
  router.post(USERS_DEPOSIT, async req => usersDepositCtr(req.body), isAuth);
}

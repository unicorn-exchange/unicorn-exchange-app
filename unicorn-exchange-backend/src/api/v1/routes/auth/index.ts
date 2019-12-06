import {Router} from "express";
import {authSignUpCtr} from "./auth-sign-up";
import {authSignInCtr} from "./auth-sign-in";
import RestypedRouter from "restyped-express-async-middleware";
import {APIV1Doc, AUTH_SIGN_IN, AUTH_SIGN_UP} from "../../../../../../unicorn-exchange-types/types/api/api-v1-doc";

export function authRouter(parentRouter: Router) {
  const router = RestypedRouter<APIV1Doc>(parentRouter);

  router.post(AUTH_SIGN_UP, async req => authSignUpCtr(req.app.ctx.services.auth, req.body));
  router.post(AUTH_SIGN_IN, async req => authSignInCtr(req.app.ctx.services.auth, req.body));
}

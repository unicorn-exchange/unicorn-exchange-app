import {Router} from "express";
import RestypedRouter from "restyped-express-async-middleware";
import {APIV1Doc, SETTINGS_COMMON} from "../../../../../../unicorn-exchange-types/types/api/api-v1-doc";
import {settingsCommonCtr} from "./settings-common";

export function settingsRouter(parentRouter: Router) {
  const router = RestypedRouter<APIV1Doc>(parentRouter);

  router.get(SETTINGS_COMMON, async () => settingsCommonCtr());
}

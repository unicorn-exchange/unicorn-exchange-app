import {Application} from "express";
import RestypedRouter from "restyped-express-async-middleware";
import {APIDoc, STATUS} from "../../../unicorn-exchange-types/types/api/api-doc";
import {statusCtr} from "./routes/status";

export function loadCommonAPI(app: Application) {
  const router = RestypedRouter<APIDoc>(app);

  router.get(STATUS, async () => statusCtr());
  router.head(STATUS, async () => statusCtr());
}

import {IEnv} from "../env";
import {Logger} from "winston";
import {IServices} from "../services";

export interface IBaseContext {
  env: IEnv;
  logger: Logger;
}

export interface IAppContext extends IBaseContext {
  services: IServices;
}

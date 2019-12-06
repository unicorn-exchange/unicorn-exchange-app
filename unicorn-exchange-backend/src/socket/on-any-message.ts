import {IAppContext} from "../interfaces/IContext";

export function onAnyMessage(msg: any, ctx: IAppContext) {
  ctx.logger.silly(msg);
}

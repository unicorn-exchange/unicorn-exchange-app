import {IAppContext} from "../interfaces/IContext";
import {disconnectSocket} from "./index";

export function onDisconnect(msg: any, ctx: IAppContext) {
  disconnectSocket(ctx);
}

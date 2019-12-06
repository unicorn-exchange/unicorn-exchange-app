import socketIO from "socket.io";
import {Server} from "http";
import {Events} from "../../../unicorn-exchange-types/types/enums/events";
import {IAppContext} from "../interfaces/IContext";
import {onDisconnect} from "./on-disconnect";
import {onAnyMessage} from "./on-any-message";
import {onNewChatMessage} from "./chat-message/on-new-chat-message";
import {authMiddleware} from "./auth-middleware";

export function initSocket(server: Server, ctx: IAppContext) {
  ctx.services.socketServer = socketIO(server, {
    transports: ["websocket"],
    origins: "*:*",
  });
  const socketServer = ctx.services.socketServer;

  socketServer.use((socket, next) => authMiddleware(socket, next, ctx));

  socketServer.on(Events.Connect, socket => {
    ctx.services.socket = socket;

    // Predefined
    socket.on(Events.Disconnect, msg => onDisconnect(msg, ctx));
    socket.on(Events.Message, msg => onAnyMessage(msg, ctx));

    // Custom
    socket.on(Events.NewChatMessage, msg => onNewChatMessage(msg, ctx, socket.authCtx));
  });
}

export async function disconnectSocket(ctx?: IAppContext): Promise<any> {
  if (!ctx) {
    return;
  }
  ctx.services.socket!.disconnect(true);
  ctx.services.socketServer!.close();
}

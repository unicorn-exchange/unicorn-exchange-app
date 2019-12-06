import {IAppContext} from "../../interfaces/IContext";
import {Events} from "../../../../unicorn-exchange-types/types/enums/events";
import {IAuthCtx} from "../auth-middleware";
import {Socket} from "socket.io";
import {createHexFromObjectIds} from "../../utils/utils";
import moment from "moment";
import {ICommonRes} from "../../../../unicorn-exchange-types/types/api/responses";
import {IBaseMessage, IChatMessage} from "../../../../unicorn-exchange-types/types/api/dtos";
import {ChatModel} from "../../schemas/chat.schema";

function isMsgValid(msg: IBaseMessage | undefined): boolean {
  return !!msg;
}

export async function onNewChatMessage(msg: IBaseMessage, ctx: IAppContext, userAuth: IAuthCtx): Promise<ICommonRes> {
  if (!isMsgValid(msg)) {
    return {
      ok: false,
      errors: ["Invalid message"],
    };
  }

  const fullMsg: IChatMessage = {
    date: moment().unix(), // TODO
    isRead: false,
    fromUserId: userAuth.user.id,
    receiverUserIds: msg.receiverUserIds,
    text: msg.text,
  };

  sendMsgToParticipants(fullMsg, ctx);

  return saveMsgInDB(fullMsg, ctx)
    .then(() => {
      return {
        ok: true,
      } as ICommonRes;
    })
    .catch(() => {
      return {
        ok: false,
      };
    });
}

// TODO: Clean up
export function sendMsgToParticipants(fullMsg: IChatMessage, ctx: IAppContext) {
  if (!ctx.services.socketServer || !ctx.services.socket) return;
  Object.values(ctx.services.socketServer.sockets.sockets)
    .filter((client: Socket) => {
      return fullMsg.fromUserId !== client.authCtx.user.id && fullMsg.receiverUserIds.includes(client.authCtx.user.id);
    })
    .forEach(receiver => ctx.services.socket!.to(receiver.id).emit(Events.NewChatMessage, fullMsg));
}

export async function saveMsgInDB(fullMsg: IChatMessage, ctx: IAppContext) {
  if (!ctx.services.mongo) return;
  const {sortedArr, hex} = createHexFromObjectIds(fullMsg.receiverUserIds.concat(fullMsg.fromUserId.toString()));

  return ChatModel.updateOne(
    {hex},
    {
      users: sortedArr,
      hex,
      $push: {messages: fullMsg},
    },
    {
      upsert: true,
    },
  );
}

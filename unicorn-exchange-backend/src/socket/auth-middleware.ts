import {Socket} from "socket.io";
import {nextFn} from "../utils/types";
import {IAppContext} from "../interfaces/IContext";
import {UserModel} from "../../../unicorn-exchange-types/types/models/user.model";

export interface IAuthCtx {
  socketId?: string; // Active socket id (if exists)
  user: UserModel;
}

// TODO
function getUserByToken(ctx: IAppContext, token?: string): Promise<UserModel> {
  return !token
    ? Promise.reject(new Error("Auth error"))
    : Promise.resolve({
      id: 1,
    });
}

export function authMiddleware(socket: Socket, next: nextFn, ctx: IAppContext) {
  const {token} = socket.handshake.query;

  return getUserByToken(ctx, token)
    .then(res => {
      socket.authCtx = {
        socketId: socket.id,
        user: res,
      };
      next();
    })
    .catch(err => next(err));
}

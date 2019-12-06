import {IAppContext} from "./interfaces/IContext";
import {IDecodedTokenObj} from "./interfaces/IAuth";
import {IAuthCtx} from "./socket/auth-middleware";
import {UserModel} from "./../../unicorn-exchange-types/types/models/user.model";

declare global {
  namespace Express {
    export interface Application {
      ctx: IAppContext;
    }

    export interface Request {
      token?: IDecodedTokenObj;
      ctx: IAppContext;
      user: UserModel;
    }
  }

  namespace SocketIO {
    export interface Socket {
      authCtx: IAuthCtx;
    }
  }
}

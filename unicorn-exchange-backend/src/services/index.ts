import {LocalAuth} from "./auth/local-auth";
import {IAuth} from "../interfaces/IAuth";
import {IErrorReporter} from "../interfaces/IErrorReporter";
import {IMailer} from "../interfaces/IMailer";
import {ErrorReporter} from "./error-reporter";
import {Mailer} from "./mailer";
import {Server, Socket} from "socket.io";
import {Sequelize} from "sequelize-typescript";
import {IBaseContext} from "../interfaces/IContext";
import {Wallet} from "./wallet/Wallet";
import {initDBConnection, initDefaultData, initModels} from "./db";
import {Mongoose} from "mongoose";
import {Queue} from "bull";

interface IQueues {
  testQueue: Queue;
}

export interface IServices {
  auth: IAuth;
  errorReporter: IErrorReporter;
  mailer: IMailer;
  queues?: IQueues;
  socket?: Socket;
  socketServer?: Server;
  mongo?: Mongoose;
  wallet: Wallet;
  db: Sequelize;
}

export async function initServices(ctx: IBaseContext): Promise<IServices> {
  const {env} = ctx;

  const db = await initDBConnection(ctx);
  await initModels(db, env);
  await initDefaultData(db, env);

  return {
    errorReporter: new ErrorReporter(ctx),
    mailer: new Mailer(ctx),
    wallet: new Wallet({network: ctx.env.BLOCKCHAIN_NETWORK}),
    auth: new LocalAuth(ctx, db),
    db,
  };
}

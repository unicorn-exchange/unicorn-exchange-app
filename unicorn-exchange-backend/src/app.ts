import {initEnvVariables} from "./env";
import express from "express";
import {initLogger} from "./utils/logger";
import {initLoaders} from "./loaders";
import {initMiddlewares} from "./api/middlewares";
import {initServices} from "./services";
import {initSocket} from "./socket";
import {IBaseContext} from "./interfaces/IContext";
import {initPolyfills} from "./utils/polyfils";
import * as http from "http";

initPolyfills(global);

const app = express();
const env = initEnvVariables();
const logger = initLogger(env);
const baseCtx: IBaseContext = {
  env,
  logger,
};

initServices(baseCtx)
  .then(services => {
    app.ctx = {
      env,
      logger,
      services,
    };
    initMiddlewares(app);
    initLoaders(app);

    return new Promise<http.Server>((resolve, reject) => {
      const server = app.listen(env.PORT, err => {
        return err ? reject(err) : logger.info(`Server is running on port: ${env.PORT}`);
      });
      resolve(server);
    });
  })
  .then(server => {
    initSocket(server, app.ctx);
  })
  .catch(err => {
    logger.error(err);
    process.exit(1);
  });

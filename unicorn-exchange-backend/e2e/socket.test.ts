import {initSocket} from "../src/socket";
import * as express from "express";
import * as SocketIOClient from "socket.io-client";
import {Events} from "../../unicorn-exchange-types/types/enums/events";
import {mockEnv} from "../tests/test_utils";

const app = express();
const server = app.listen(mockEnv.PORT);

describe("Socket connection test", () => {
  it("should connect to socket", () => {
    initSocket(server);
    const socket = SocketIOClient(`http://localhost:${mockEnv.PORT}`);
    return new Promise(resolve => {
      socket.on(Events.Connect, () => {
        resolve();
      });
    });
  });
});

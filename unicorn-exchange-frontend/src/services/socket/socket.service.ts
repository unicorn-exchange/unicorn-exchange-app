import {Injectable} from "@angular/core";
import io from "socket.io-client";
import {createMockSocket} from "./socket-mock";
import Socket = SocketIOClient.Socket;
import Emitter = SocketIOClient.Emitter;


@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket: Socket;
  private connectOptions: SocketIOClient.ConnectOpts = {
    secure: false,
    transports: ["websocket"],
    autoConnect: false,
    query: {
      token: null,
    },
  };

  constructor() {
    this.socket = io.connect("", this.connectOptions);
  }

  setAuth(token?: string) {
    // @ts-ignore
    this.connectOptions.query.token = token; // TODO: Add interface
  }

  connect(
    isFakeNetwork = false,
    isForce = false,
    url = "ws://localhost:3000",
  ) {
    if (isFakeNetwork || !this.socket) {
      this.socket = createMockSocket(url);
      return;
    }
    if (isForce || !this.socket || !this.socket.connected) {
      this.socket = io.connect(url, this.connectOptions);
      this.socket.connect();
      return;
    }
  }

  on(event: string, fn: (msg: any) => void): Emitter {
    return this.socket.on(event, fn);
  }

  emit(event: string, ...args: any[]): Socket {
    return this.socket.emit(event, ...args);
  }
}

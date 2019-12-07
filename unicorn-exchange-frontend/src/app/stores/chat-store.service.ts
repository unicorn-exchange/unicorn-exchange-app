import {Injectable} from "@angular/core";
import {BackendService} from "../../services/api/backend.service";
import {BehaviorSubject} from "rxjs";
import {CommonStore} from "./common-store.service";
import {SocketService} from "../../services/socket/socket.service";
import {Events} from "../../services/socket/events";
import {Env} from "../../environments/env";
import {take} from "rxjs/operators";
import {messages} from "../../services/api/mock/messages";

enum MessageStates {
  loading = "loading",
  success = "success",
  error = "error",
  read = "read",
}

interface IFile {
  url: string;
  icon: any;
  type?: string;
}

interface IUserBaseInfo {
  name: string;
  avatar: string;
}

export interface IMessage {
  text: string;
  reply?: boolean;
  date?: any;
  user: IUserBaseInfo;
  state?: string;
  type?: string;
  quote?: string;
  files?: IFile[];
}

interface IStoreState {
  messages: IMessage[];
}

@Injectable({
  providedIn: "root"
})
export class ChatStore {
  $state: BehaviorSubject<IStoreState> = new BehaviorSubject<IStoreState>({
    messages: [],
  });
  $messages = new BehaviorSubject<IMessage[]>([]);

  constructor(
    private backend: BackendService,
    private commonStore: CommonStore,
    private socketService: SocketService,
  ) {
    this.socketService.connect(Env.FAKE_EXCHANGE_API);
    this.socketService.on(Events.NewChatMessage, msg => this.onNewMsg(JSON.parse(msg)));
  }

  loadMessages() {
    this.$state.next({
      messages: messages.payload
        .map(i => {
          i.state = MessageStates.success;
          return i;
        }),
    });
  }

  sendMessage(msg: IMessage) {
    msg.reply = true;
    this.updateMsgArr(msg);
    this.socketService.emit(Events.NewChatMessage, msg);
  }

  onNewMsg(msg: IMessage) {
    if (!isValidMsg(msg)) {
      return;
    }
    this.updateMsgArr(msg);
  }

  updateMsgArr(msg: IMessage) {
    // TODO: Check if it's optimal
    this.$state
      .pipe(take(1))
      .subscribe(state => {
        this.$state.next({messages: [...state.messages, msg]});
      });
  }
}

function isValidMsg(msg) {
  return true;
}

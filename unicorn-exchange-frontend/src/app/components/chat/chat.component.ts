import {Component, OnInit} from "@angular/core";
import {BaseComponent} from "../base-component/base.component";
import {ChatStore} from "../../stores/chat-store.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent extends BaseComponent implements OnInit {
  $messages = this.chatStore.$messages;

  constructor(
    private chatStore: ChatStore,
  ) {
    super();
  }

  ngOnInit() {
    this.chatStore.loadMessages();
  }

  sendMessage(event) {
  }
}

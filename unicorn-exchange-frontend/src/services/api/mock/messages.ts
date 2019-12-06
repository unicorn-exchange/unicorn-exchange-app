import {defaultResponse} from "./default_response";
import {ICommonRes} from "../../../../../unicorn-exchange-types/types/api/responses";
import {IMessage} from "../../../app/stores/chat-store.service";

interface IMessageRes extends ICommonRes {
  payload: IMessage[];
}

export const messages: IMessageRes = {
  payload: [
    {
      text: "Order processing started.",
      reply: true,
      state: "new",
      date: new Date(),
      user: {
        name: "Kate Moss",
        avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      },
    },
    {
      text: "Thanks for choosing my order!",
      reply: false,
      state: "new",
      date: new Date(),
      user: {
        name: "John Doe",
        avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      },
    },
    {
      text: "Some order info...",
      reply: false,
      state: "new",
      date: new Date(),
      user: {
        name: "John Doe",
        avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      },
    },
  ],
  ...defaultResponse
};

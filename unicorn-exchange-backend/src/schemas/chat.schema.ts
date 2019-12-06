import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {ChatMessageSchema} from "./chat-message.schema";
import {Schemas} from "../../../unicorn-exchange-types/types/enums/schemas";

export const ChatSchema = new Schema({
  users: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: Schemas.Users,
      },
    ],
    default: [],
  },
  hex: String,
  messages: {
    type: [ChatMessageSchema],
    default: [],
  },
});

export const ChatModel = mongoose.model(Schemas.Chats, ChatSchema);

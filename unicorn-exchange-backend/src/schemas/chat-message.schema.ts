import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {Schemas} from "../../../unicorn-exchange-types/types/enums/schemas";

export const ChatMessageSchema = new Schema({
  text: {
    type: String,
  },
  fromUserId: {
    type: Schema.Types.ObjectId,
    ref: Schemas.Users,
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: Schemas.Chats,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

export const ChatMessageModel = mongoose.model(Schemas.ChatMessages, ChatMessageSchema);

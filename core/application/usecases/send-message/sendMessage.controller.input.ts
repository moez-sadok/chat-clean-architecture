import { SendMessageInputData } from "../../../dtos/input.chat.data";

export interface ISendMessageInput {
  sendMessage(message: SendMessageInputData): void;
}

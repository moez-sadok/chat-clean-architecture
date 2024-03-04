
import { SendMessageInputData } from "../../dtos/input.chat.data";

export interface IReceiveMessageInput {
  receiveMessage(message: SendMessageInputData): void;
}

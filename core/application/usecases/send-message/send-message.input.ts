import { SendMessageInputData } from "./send-message.request";
import { SendMessageOutputData } from "./send-message.response";

export interface ISendMessageInput {
  sendMessage(message: SendMessageInputData):Promise<SendMessageOutputData> ; 
}

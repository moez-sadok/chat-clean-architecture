import { SendMessageInputData } from "./send-message.request.data";
import { SendMessageOutputData } from "./send-message.response.data";

export interface ISendMessageInput {
  sendMessage(message: SendMessageInputData):Promise<SendMessageOutputData> ; 
}

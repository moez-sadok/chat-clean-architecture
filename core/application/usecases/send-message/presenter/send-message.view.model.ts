import { SendMessageOutputData } from "../send-message.response";

export interface SendMessageViewModel {
  sendButtonLabel: string;
  sentMessages: SendMessageOutputData[];
}

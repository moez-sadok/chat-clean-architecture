
import { SendMessageViewModel } from "./sendMessage.view.model";

export interface ISendMessageView {

  sentMessageViewModel: SendMessageViewModel;
  
  display(message: string): void;

}

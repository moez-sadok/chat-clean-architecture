
import { SendMessageViewModel } from "./send-message.view.model";

export interface ISendMessageView {

  sentMessageViewModel: SendMessageViewModel;
  
  display(message: string): void;

}

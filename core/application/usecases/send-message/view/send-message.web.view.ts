import { ISendMessageView } from "../presenter/send-message.view";
import { SendMessageViewModel } from "../presenter/send-message.view.model";
import { SendMessageOutputData } from "../send-message.response";

// Standalone in-memory view: keeps what was sent. The SPA uses the room's message list instead.
export class SendMessageWebView implements ISendMessageView {

  readonly sentMessageViewModel: SendMessageViewModel = { sendButtonLabel: "Send", sentMessages: [] };

  display(message: SendMessageOutputData): void {
    this.sentMessageViewModel.sentMessages.push(message);
  }

}

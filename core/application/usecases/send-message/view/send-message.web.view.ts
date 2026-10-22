import { ISendMessageView } from "../presenter/send-message.view";
import { SendMessageViewModel } from "../presenter/send-message.view.model";

export class SendMessageWebView implements ISendMessageView {
    sentMessageViewModel: SendMessageViewModel;

    constructor() {
        this.sentMessageViewModel = {
            sendButtonLabel: "Send",
            messageContent: "",
            sentMessages: []
        };
    }

    display(message: string): void {
         this.sentMessageViewModel.sentMessages.push(message);
    }

}
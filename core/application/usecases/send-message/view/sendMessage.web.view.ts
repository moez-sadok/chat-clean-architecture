import { ISendMessageView } from "../presenter/sendMessage.view";
import { SendMessageViewModel } from "../presenter/sendMessage.view.model";

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
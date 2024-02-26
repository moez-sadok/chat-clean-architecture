
import { IChatClient } from "../../components/network/chat-client.port";
import { MessageOutputData } from "../../dtos/output.chat.data";
import { ISendMessagePresenterOutput } from "../../features/send-message/sendMessage.presenter.output";
export class ChatClientPortImpl implements IChatClient {

  constructor(private userId: number, protected userName: string,
    protected presenter? :ISendMessagePresenterOutput) { }
 
  receive(message: MessageOutputData): void {
   if(this.presenter) this.presenter.receiveNewMessage(message);
  }
  
  getId(): number {
    return this.userId;
  }

}

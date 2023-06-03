
import { MessageOutputData } from "../../dtos/output.chat.data";
import { IChatClient } from "../../interfaces/network/chat-client.port";
import { IChatPresenterOutputBoundary } from "../../interfaces/outputs/chat.presenter.output.boundary";
export class ChatClientPortImpl implements IChatClient {

  constructor(private userId: number, private presenter? :IChatPresenterOutputBoundary) { }

  receive(message: MessageOutputData): void {
   if(this.presenter) this.presenter.receiveNewMessage(message);
   else this.emit(message);
  }
  
  getId(): number {
    return this.userId;
  }

  emit(data: MessageOutputData): void {
    console.log('Client emit data',this.getId(),data);
  }

}

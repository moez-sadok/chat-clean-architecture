
import { MessageOutputData } from "../../dtos/output.chat.data";
import { IChatClient } from "../../interfaces/network/chat-client.port";
import { IChatPresenterOutputBoundary } from "../../interfaces/outputs/chat.presenter.output.boundary";

export class ChatClientPortMemoryImpl implements IChatClient {

  constructor(private userId: number, private presenter? :IChatPresenterOutputBoundary) { }

  receive(message: MessageOutputData): void {
   if(this.presenter) this.presenter.receiveNewMessage(message);
   else console.log('No presenter - Receved message',message, 'For client', this.getId());
  }
  
  getId(): number {
    return this.userId;
  }

  emit(event: string, data: any): void {
    console.log('Client emit',event, ' with data',data);
  }

  join(roomId: number): void {
    console.log('Client ',this.getId(), ' join room',roomId);
  }

  leave(roomId: number): void {
    console.log('Client ',this.getId(), ' leave room',roomId);
  }

}

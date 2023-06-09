
import { MessageOutputData } from "../../dtos/output.chat.data";
import { IChatClient } from "../../interfaces/network/chat-client.port";
import { IChatPresenterOutputBoundary } from "../../interfaces/outputs/chat.presenter.output.boundary";
export class ChatClientPortImpl implements IChatClient {

  constructor(private userId: number, protected userName: string,protected presenter? :IChatPresenterOutputBoundary) { }
 
  receive(message: MessageOutputData): void {
   if(this.presenter) this.presenter.receiveNewMessage(message);
  }
  
  getId(): number {
    return this.userId;
  }

  getName(): string {
    return this.userName;
  }

  setName(name: string): void {
    this.userName = name;
  }

}

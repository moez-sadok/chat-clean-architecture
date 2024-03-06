import { IChatClient, ISendMessagePresenterOutput, MessageOutputData } from "@chat-clean-architecture/chat/application-business-rules/interactor";

export class ChatClientPortImpl implements IChatClient {

  constructor(
    protected userId: number, 
    protected userName: string,
    public presenter ?:ISendMessagePresenterOutput) { }
 
  receive(message: MessageOutputData): void {
   if(this.presenter) this.presenter.receiveNewMessage(message);
  }
  
  getId(): number {
    return this.userId;
  }

}

import { IGetMessagesByRoomPresenterOutput, ISendMessagePresenterOutput, MessageOutputData } from "../../../../core/application/usecases";
import { IChatClient } from "../../../../core/gateways";

export class ChatClientMemoryImpl implements IChatClient {

  constructor(
    protected userId: number,
    protected userName: string,
    // public presenter?: ISendMessagePresenterOutput
    public presenter?: IGetMessagesByRoomPresenterOutput
  ) { }

  receive(msg: string, roomId: number, receiverId: number, receiverName: string): void {
    const messageOutput: MessageOutputData = { chatRoomId: roomId, message: msg, authorName: receiverName, authorId : receiverId }
    // if (this.presenter) this.presenter.receiveNewMessage(messageOutput);
    if (this.presenter) this.presenter.presentNewMessage(messageOutput);
  }

  getId(): number {
    return this.userId;
  }

}

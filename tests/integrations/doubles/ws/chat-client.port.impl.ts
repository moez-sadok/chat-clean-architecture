import { IGetMessagesByRoomPresenterOutput, MessageOutputData } from "../../../../core/application";
import { IChatClient } from "../../../../core/domain";

export class ChatClientMemoryImpl implements IChatClient {

  constructor(
    protected userId: number,
    protected userName: string,
    public presenter?: IGetMessagesByRoomPresenterOutput
  ) { }

  receive(msg: string, roomId: number, receiverId: number, receiverName: string): void {
    const messageOutput: MessageOutputData = { chatRoomId: roomId, message: msg, authorName: receiverName, authorId : receiverId };
    if (this.presenter) this.presenter.presentNewMessage(messageOutput);
  }

  getId(): number {
    return this.userId;
  }

}

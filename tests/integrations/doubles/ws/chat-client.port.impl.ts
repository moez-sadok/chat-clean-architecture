import { MessageOutputData } from "../../../../core/dtos/output.chat.data";
import { ISendMessagePresenterOutput } from "../../../../core/features/chat";
import { IChatClient } from "../../../../core/gateways";

export class ChatClientPortImpl implements IChatClient {

  constructor(
    protected userId: number,
    protected userName: string,
    public presenter?: ISendMessagePresenterOutput) { }

  receive(msg: string, roomId: number, receiverId: number, receiverName: string): void {
    const messageOutput: MessageOutputData = { chatRoomId: roomId, message: msg, authorName: receiverName, authorId : receiverId }
    if (this.presenter) this.presenter.receiveNewMessage(messageOutput);
  }

  getId(): number {
    return this.userId;
  }

}

// import { ISendMessagePresenterOutput, MessageOutputData } from "@chat-clean-architecture/chat/application-business-rules/interactor";
// import { IChatClient } from "@chat-clean-architecture/chat/entreprise-business-rules/notifiyer";

import { MessageOutputData } from "../../../dtos/output.chat.data";
import { ISendMessagePresenterOutput } from "../../../features/chat";
import { IChatClient } from "../../../gateways";

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

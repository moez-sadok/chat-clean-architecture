import { IGetMessagesByRoomPresenterOutput } from "../get-messages-by-room.output";
import { MessageOutputData, GetMessagesOutputData, RoomOutputData } from "../get-messages-by-room.response";
import { IGetMessagesByRoomView } from "./get-messages-by-room.view";
import { MessageViewModel } from "./get-messages-by-room.view.model";

export class GetMessagesByRoomPresenterUi implements IGetMessagesByRoomPresenterOutput {

  constructor(public view: IGetMessagesByRoomView) { }

  presentMessages(messages: MessageOutputData[], room: RoomOutputData): GetMessagesOutputData {
    const ouputMessages: MessageViewModel[] = messages.map((m) => {
      return { content: m.message, roomId: m.chatRoomId, participantName: m.authorName };
    });
    this.view.setActiveRoom(room.roomId, room.roomName);
    this.view.render(ouputMessages);
    return { messages: messages, roomName: room.roomName, roomId: room.roomId };
  }

  presentNewMessage(message: MessageOutputData): MessageOutputData {
    this.view.receiveNewMessage(message);
    return message;
  }


}

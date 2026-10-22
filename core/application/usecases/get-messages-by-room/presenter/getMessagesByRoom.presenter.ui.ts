import { GetRoomsByUserResponseData } from "../../get-rooms-by-user";
import { IGetMessagesByRoomPresenterOutput } from "../interactor/getMessagesByRoom.presenter.output";
import { MessageOutputData, GetMessagesOutputData } from "../interactor/getMessagesByRoom.response.data";
import { IGetMessagesByRoomView } from "./getMessagesByRoom.view";
import { MessageViewModel } from "./getMessagesByRoom.view.model";

export class GetMessagesByRoomPresenterUi implements IGetMessagesByRoomPresenterOutput {

  constructor(public view: IGetMessagesByRoomView) { }

  presentMessages(messages: MessageOutputData[], room: GetRoomsByUserResponseData): GetMessagesOutputData {
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

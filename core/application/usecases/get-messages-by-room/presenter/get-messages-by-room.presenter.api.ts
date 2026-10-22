import { IGetMessagesByRoomPresenterOutput } from "../get-messages-by-room.output";
import { MessageOutputData, GetMessagesOutputData, RoomOutputData } from "../get-messages-by-room.response";

export class GetMessagesByRoomPresenterApi implements IGetMessagesByRoomPresenterOutput {

  presentMessages(messages: MessageOutputData[], room: RoomOutputData): GetMessagesOutputData {
    return { messages: messages, roomName: room.roomName, roomId: room.roomId };
  }

  presentNewMessage(message: MessageOutputData): MessageOutputData {
    return message;
  }
 
}

import { GetRoomsByUserResponseData } from "../../get-rooms-by-user";
import { IGetMessagesByRoomPresenterOutput } from "../interactor/getMessagesByRoom.presenter.output";
import { MessageOutputData, GetMessagesOutputData } from "../interactor/getMessagesByRoom.response.data";

export class GetMessagesByRoomPresenterApi implements IGetMessagesByRoomPresenterOutput {

  presentMessages(messages: MessageOutputData[], room: GetRoomsByUserResponseData): GetMessagesOutputData {
    return { messages: messages, roomName: room.roomName, roomId: room.roomId };
  }

  presentNewMessage(message: MessageOutputData): MessageOutputData {
    return message;
  }
 
}

import { IGetRoomsByUserPresenterOutput } from "../../features/chat/get-rooms-by-user/getRoomsByUser.presenter.output";
import { MessageOutputData, RoomOutputData, UserOutputData } from "../../dtos/output.chat.data";
import { IGetMessagesByRoomPresenterOutput, IGetUserByIdPresenterOutput, ISendMessagePresenterOutput } from "@cca/core-features";

export class GetRoomsByUserPresenterAPI implements IGetRoomsByUserPresenterOutput {
  selectedRoomsByUser(rooms: RoomOutputData[]): RoomOutputData[] {
    return rooms;
  }
}

export class GetUserByIdPresenterAPI implements IGetUserByIdPresenterOutput {
  selectedUser(user: UserOutputData): UserOutputData {
    return user;
  }
}

export class GetMessagesByRoomPresenterApi implements IGetMessagesByRoomPresenterOutput {
  selectChatRoomsMessages(messages: MessageOutputData[], room: RoomOutputData): MessageOutputData[] {
    return messages;
  }
}

export class SendMessagePresenterApi implements ISendMessagePresenterOutput {
  receiveNewMessage(message: MessageOutputData): MessageOutputData {
    return message;
  }
}



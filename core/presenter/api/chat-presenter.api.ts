import { MessageOutputData, UserOutputData } from "../../dtos/output.chat.data";
import { IGetUserByIdPresenterOutput, IGetMessagesByRoomPresenterOutput, ISendMessagePresenterOutput } from "../../application/usecases";


export class GetUserByIdPresenterAPI implements IGetUserByIdPresenterOutput {
  selectedUser(user: UserOutputData): UserOutputData {
    return user;
  }
}

export class GetMessagesByRoomPresenterApi implements IGetMessagesByRoomPresenterOutput {
  selectChatRoomsMessages(messages: MessageOutputData[]): MessageOutputData[] {
    return messages;
  }
}

export class SendMessagePresenterApi implements ISendMessagePresenterOutput {
  receiveNewMessage(message: MessageOutputData): MessageOutputData {
    return message;
  }
}



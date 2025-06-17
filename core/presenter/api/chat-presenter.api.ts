import { UserOutputData } from "../../dtos/output.chat.data";
import { IGetUserByIdPresenterOutput, ISendMessagePresenterOutput, MessageOutputData } from "../../application/usecases";
export class GetUserByIdPresenterAPI implements IGetUserByIdPresenterOutput {
  selectedUser(user: UserOutputData): UserOutputData {
    return user;
  }
}

export class SendMessagePresenterApi implements ISendMessagePresenterOutput {
  receiveNewMessage(message: MessageOutputData): MessageOutputData {
    return message;
  }
}

// //toremove
// export class GetMessagesByRoomPresenterApi implements IGetMessagesByRoomPresenterOutput {
//   presentMessages(messages: MessageOutputData[], room: GetRoomsByUserResponseData): GetMessagesOutputData {
//     return { messages: messages, roomName: room.roomName };
//   }
//   // presentMessages(messages: MessageOutputData[]): MessageOutputData[] {
//   //   return messages;
//   // }
// }


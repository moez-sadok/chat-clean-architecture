
// // import { IChatAppFacadeControllerInput, GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData, RoomOutputData, MessageOutputData, UserOutputData, IChatAppFacadePresenterOutput } from '@chat-clean-architecture/chat/application-business-rules/interactor';
// import { IChatHttpController } from '../chat.controllor';
// // Adapter pattern (Object) 
// export class ChatControllerMemoryImpl implements IChatHttpController {

//   constructor(protected interactorInputboundry: IChatAppFacadeControllerInput) { }

//   getUserById(userId: number): Promise<UserOutputData | null> {
//     return this.interactorInputboundry.getUser(userId);
//   }

//   getUserRooms(userId: number): Promise<RoomOutputData[]> {
//     const userInput: GetRoomsByUserInputData = { userId: userId };
//     return this.interactorInputboundry.getRoomsByUser(userInput);
//   }

//   getRoomMessages(roomId: number, roomName: string): Promise<MessageOutputData[]> {
//     const roomInput: GetRoomMessagesInputData = { roomId: roomId, roomName: roomName };
//     return this.interactorInputboundry.getChatRoomsMessages(roomInput);
//   }

//   sendMessage(roomId: number, userId: number, message: string) {
//     const messageInput: SendMessageInputData = { roomId: roomId, userId: userId, message: message };
//     return this.interactorInputboundry.sendMessage(messageInput);
//   }
// }

// import {
//   ChatDataViewModelDto,
//   IChatWebViewScreen,
//   MessageDataViewModelDto,
//   RoomDataViewModelDto,
// } from '@chat-clean-architecture/chat/adapters/presenters';
// import {
//   SendMessageInputData,
// } from '@chat-clean-architecture/chat/application-business-rules/interactor';
// import { IChatController } from '@chat-clean-architecture/chat/adapters/controllers';
// import { IChatAppMainFacade } from './interfaces/chat.app.main.facade';

// //depracated : use contrleer and view inside the component client
// // Main app role for the web ui client
// export class ChatAppMain implements IChatAppMainFacade {

//   constructor(
//     private chatView: IChatWebViewScreen,
//     private chatController: IChatController
//     ) {
//       console.log('ChatAppMain constructor')
//   }

//   getUserChatView(userId: number): Promise<ChatDataViewModelDto> {
//     this.chatController.getUserRooms(userId);
//     return new Promise((resolve) => {
//       //resolve(this.chatView.chatDataViewModelDto);
//     });
//   }

//   getRoomMessages(roomId: number, roomName: string, userId: number): Promise<MessageDataViewModelDto[]> {
//     const room: RoomDataViewModelDto = { roomId: roomId, name: roomName};
//     this.chatView.setActiveRoom(room);
//     this.chatController.getRoomMessages(roomId,roomName,userId);
//     return new Promise((resolve) => {
//       //resolve(this.chatView.chatDataViewModelDto.activeRoomMessages || []);
//     });
//   }

//   sendMessage(message: SendMessageInputData): Promise<MessageDataViewModelDto> {
//     if (message.roomId == null || message.roomId == undefined)
//       throw new Error('No selected room');
//     this.chatController.sendMessage(
//       message.roomId,
//       message.userId,
//       message.message
//     );
//     //this.receiveMessage();
//     return new Promise((resolve) => {
//      // resolve(this.chatView.lastMessage);
//     });
//   }

//   receiveMessage(): Promise<MessageDataViewModelDto> {
//     return new Promise((resolve) => {
//      // resolve(this.chatView.lastMessage);
//     });
//   }

//   // ChatServer / ConnectedUser behavior
//   initUserConnection(connectedUserId: number): void {
//     console.log('Init user data for user id:',connectedUserId);
//     this.chatController.initUserConnection(connectedUserId);
//     this.getUserChatView(connectedUserId);
//   }

//   leaveRoom(currentroomId: number): void {
//     console.log('leave Room id:',currentroomId);
//   }

//   joinRoom(roomId: number): void {
//     console.log('join room id:',roomId);
//   }

// }

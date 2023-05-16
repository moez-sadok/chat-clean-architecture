// import { IChatWebViewScreen, RoomDataViewModelDto } from '@chat-clean-architecture/chat/adapters/presenters';
// import { UserWebViewClientImpl } from '@chat-clean-architecture/chat/adapters/views';
// import { IChatAppMainFacade } from './interfaces/chat.app.main.facade';
// //deprecated
// export class ChatWebUIMainFacade {

//   //public chatView: IChatWebViewScreen = new UserWebViewClientImpl();
//   public connectedUserId: number;

//   constructor(
//     private chatAppMainFacade: IChatAppMainFacade,
//     public userId: number,
//     public chatView: IChatWebViewScreen
//   ) {
//     console.log('ChatWebUIMainFacade constructor');
//     this.connectedUserId = +userId;
//     this.chatAppMainFacade.initUserConnection(this.connectedUserId);
//     this.setActiveUser(this.connectedUserId);
//     //this.receiveLastMessage();
//   }

//   sendMessageInActiveRoom(message: string) {
//     const roomId = this.chatView.chatDataViewModelDto.activeRoom?.roomId;
//     if (roomId == null || roomId == undefined)
//       throw new Error('No selected room');
//     const msg = {
//       roomId: roomId,
//       userId: this.connectedUserId,
//       message: message,
//     };
//     this.chatAppMainFacade.sendMessage(msg);
//     this.receiveLastMessage();
//   }

//   setActiveChatRoom(room: RoomDataViewModelDto) {
//     const currentroomId = this.chatView.chatDataViewModelDto.activeRoom?.roomId;
//     if (currentroomId == undefined || currentroomId == null)
//       return this.joinSelectedRoom(room);
//     if (room.roomId === currentroomId) return;
//     this.chatAppMainFacade.leaveRoom(currentroomId);
//     this.joinSelectedRoom(room);
//   }

//   private joinSelectedRoom(room: RoomDataViewModelDto) {
//     this.chatView.setActiveRoom(room);
//     this.chatAppMainFacade.joinRoom(room.roomId);

//     this.chatAppMainFacade
//       .getRoomMessages(room.roomId,this.connectedUserId)
//       .then((res) => this.chatView.displayChatRoomsMessages(res));
//   }

//   private setActiveUser(activeUserId: number) {
//     this.chatAppMainFacade
//       .getUserChatView(activeUserId)
//       .then((res) => this.chatView.displayChatPageView(res));
//   }

//   private receiveLastMessage() {
//     this.chatAppMainFacade.receiveMessage().then((res) => {
//       console.log('receiveLastMessage ChatWebUIMainFacade', res);
//       if (res) this.chatView.receiveMessage(res);
//     });
//   }

//   // getChatViewModel(){
//   //   return this.chatView.chatDataViewModelDto;
//   // }
// }

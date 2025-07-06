import { SendMessageOutputData } from "../interactor/send-message.response.data";
import { ISendMessagePresenterOutput } from "../interactor/sendMessage.presenter.output";
import { ISendMessageView } from "./sendMessage.view";

export class SendMessagePresenterUi implements ISendMessagePresenterOutput {

  constructor(private view: ISendMessageView) {}

  receiveNewMessage(message: SendMessageOutputData): SendMessageOutputData {
    return message;
  }
}


//private notifNewMessageOnInactiveRoom(roomId: number, notifsNumber = 0) {
// if (!this.chatWebViewScreen.chatDataViewModelDto.rooms)
//   throw new Error('Not found rooms in the connect user view');
// const roomHasNewMessageIndex = this.chatWebViewScreen.chatDataViewModelDto.rooms?.findIndex(e => e.roomId === +roomId);
// if (roomHasNewMessageIndex == undefined || roomHasNewMessageIndex < 0)
//   throw new Error('Room not found to set local notif of new messages' + roomHasNewMessageIndex);
// const roomHasNewMessage = this.chatWebViewScreen.chatDataViewModelDto.rooms[roomHasNewMessageIndex];
// const currentNewMessagesNotif = notifsNumber == -1 ? 0 : roomHasNewMessage.newMessagesNotif
//   ? roomHasNewMessage.newMessagesNotif + 1 : 1;
// const newRoomView: RoomViewModel = { ...roomHasNewMessage, newMessagesNotif: currentNewMessagesNotif };
// const currRooms = [...this.chatWebViewScreen.chatDataViewModelDto.rooms];
// currRooms[roomHasNewMessageIndex] = newRoomView;
//this.chatWebViewScreen.displayChatPageRooms(currRooms);
//}
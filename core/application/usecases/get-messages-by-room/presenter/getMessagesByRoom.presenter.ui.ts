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
    //this.notifNewMessageOnInactiveRoom(room?.roomId, -1);//reset
    return { messages: messages, roomName: room.roomName, roomId: room.roomId };
  }

  presentNewMessage(message: MessageOutputData): MessageOutputData {
    this.view.receiveNewMessage(message);
    return message;
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
    // this.chatWebViewScreen.displayChatPageRooms(currRooms);
  //}

}

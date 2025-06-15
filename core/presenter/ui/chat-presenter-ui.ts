import { UserOutputData, MessageOutputData } from '../../dtos/output.chat.data';
import { GetRoomsByUserResponseData, RoomViewModel } from '../../application/usecases';
import { IChatAppFacadePresenterOutput } from '../entry.facade.presenter';
import { MessageViewModel } from './chat.data.view.model';
import { IChatView } from './chat.view';

export class ChatUiPresenterImpl  implements IChatAppFacadePresenterOutput {

  constructor(private chatWebViewScreen: IChatView) {
    //init empty view model
    this.chatWebViewScreen.chatDataViewModelDto = {
     // rooms: [],
      activeRoomMessages: [],
      activeRoom: { name: '', roomId: -1 },
      activeUser: { name: '', id: -1 },
      sendButtonLabel: 'Send',
      menuItemLeaveRoomLabel: 'Leave room',
      menuItemAddParticipantLabel: 'Add',
      defaultView: 'native',
    };
  }

  selectedUser(user: UserOutputData): UserOutputData {
    this.chatWebViewScreen.setActiveUser(user);
    return user;
  }

  receiveNewMessage(message: MessageOutputData): MessageOutputData {
    //for adding e2ee decrypt message in the client side presenter
    const messageInput: MessageViewModel = {
      content: message.message,
      participantName: message.authorName, roomId: message.chatRoomId
    };
    //check if the room is active (opened)
    if (message.chatRoomId === this.chatWebViewScreen.chatDataViewModelDto.activeRoom?.roomId)
      this.chatWebViewScreen.receiveMessage(messageInput);
   else this.notifNewMessageOnInactiveRoom(message.chatRoomId);
    return message;
  }

  selectChatRoomsMessages(messages: MessageOutputData[], room: GetRoomsByUserResponseData): MessageOutputData[] {
    const ouputMessages: MessageViewModel[] = messages.map((m) => {
      return { content: m.message, roomId: m.chatRoomId, participantName: m.authorName };
    });
    const roomView: RoomViewModel = { roomId: room?.roomId, name: room?.roomName, participantNames: room.participantsNames };
    this.chatWebViewScreen.setActiveRoom(roomView);
    this.chatWebViewScreen.displayChatRoomsMessages(ouputMessages);
    this.notifNewMessageOnInactiveRoom(room?.roomId, -1);//reset
    return messages;
  }

  // selectedRoomsByUser(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[] {
  //   const roomsVM = rooms.map((e) => { return { name: e.roomName, roomId: e.roomId } as RoomViewModel; })
  //   this.chatWebViewScreen.displayChatPageRooms(roomsVM);
  //   return rooms;
  // }

  private notifNewMessageOnInactiveRoom(roomId: number, notifsNumber = 0) {
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
  }

}

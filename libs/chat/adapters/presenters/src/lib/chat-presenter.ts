import { IChatPresenterOutputBoundary, MessageOutputData, RoomOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { MessageDataViewModelDto, RoomDataViewModelDto, ChatDataViewModelDto } from './dtos/chat.data.view.model';
import { IChatWebViewScreen } from './interfaces/web.screen.view';

export class ChatWebPresenterImpl implements IChatPresenterOutputBoundary {
  
  constructor(private chatWebViewScreen: IChatWebViewScreen) { }

  receiveNewMessage(message: MessageOutputData): void {
    const messageInput: MessageDataViewModelDto = {
      content: message.message,
      participantName: message.participantName,
      roomId: message.chatRoomId
    };
    this.chatWebViewScreen.receiveMessage(messageInput);
  }

  selectChatRoomsMessages(messages: MessageOutputData[], room: RoomOutputData): void {
    const ouputMessages: MessageDataViewModelDto[] = messages.map((m) => {
      return {
        content: m.message,
        roomId: m.chatRoomId,
        participantName: m.participantName,
      };
    });
    const roomView: RoomDataViewModelDto = { roomId: room?.roomId, name: room?.roomName };
    this.chatWebViewScreen.setActiveRoom(roomView);
    this.chatWebViewScreen.displayChatRoomsMessages(ouputMessages);
  }

  selectedRoomsByUser(rooms: RoomOutputData[]): void {
    const pchatView: ChatDataViewModelDto = {
      rooms: rooms.map((e) => {
        return { name: e.roomName, roomId: e.roomId } as RoomDataViewModelDto;
      }),
      activeRoom: { name: rooms[0].roomName, roomId: rooms[0].roomId },
      sendButtonLabel: 'Send',
      menuItemLeaveRoomLabel: 'Leave room',
      menuItemAddParticipantLabel: 'Add',
    };
    this.chatWebViewScreen.displayChatPageView(pchatView);
  }
}

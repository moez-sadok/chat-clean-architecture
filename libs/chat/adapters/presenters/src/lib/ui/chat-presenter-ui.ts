import { IChatPresenterOutputBoundary, MessageOutputData, RoomOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { MessageDataViewModelDto, RoomDataViewModelDto, ChatDataViewModelDto } from './chat.data.view.model';
import { IChatView } from './chat.view';

export class ChatUiPresenterImpl implements IChatPresenterOutputBoundary {

  constructor(private chatWebViewScreen: IChatView) { }

  receiveNewMessage(message: MessageOutputData): MessageOutputData {
    const messageInput: MessageDataViewModelDto = {
      content: message.message,
      participantName: message.participantName,
      roomId: message.chatRoomId
    };
    this.chatWebViewScreen.receiveMessage(messageInput);
    return message;
  }

  selectChatRoomsMessages(messages: MessageOutputData[], room: RoomOutputData): MessageOutputData[] {
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
    return messages;
  }

  selectedRoomsByUser(rooms: RoomOutputData[]): RoomOutputData[] {
    const pchatView: ChatDataViewModelDto = {
      rooms: rooms.map((e) => {
        return { name: e.roomName, roomId: e.roomId } as RoomDataViewModelDto;
      }),
      activeRoom: { name: '', roomId: -1},
      sendButtonLabel: 'Send',
      menuItemLeaveRoomLabel: 'Leave room',
      menuItemAddParticipantLabel: 'Add',
    };
    this.chatWebViewScreen.displayChatPageRooms(pchatView);
    return rooms;
  }
}

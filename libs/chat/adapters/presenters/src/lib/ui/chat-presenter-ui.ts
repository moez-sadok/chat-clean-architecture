import { IChatPresenterOutputBoundary, MessageOutputData, RoomOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { MessageViewModel, RoomViewModel, ChatDataViewModelDto } from './chat.data.view.model';
import { IChatView } from './chat.view';

export class ChatUiPresenterImpl implements IChatPresenterOutputBoundary {

  constructor(private chatWebViewScreen: IChatView) { }

  receiveNewMessage(message: MessageOutputData): MessageOutputData {
    const messageInput: MessageViewModel = {
      content: message.message,
      participantName: message.authorName,
      roomId: message.chatRoomId
    };
    this.chatWebViewScreen.receiveMessage(messageInput);
    return message;
  }

  selectChatRoomsMessages(messages: MessageOutputData[], room: RoomOutputData): MessageOutputData[] {
    const ouputMessages: MessageViewModel[] = messages.map((m) => {
      return {
        content: m.message,
        roomId: m.chatRoomId,
        participantName: m.authorName,
      };
    });
    const roomView: RoomViewModel = { roomId: room?.roomId, name: room?.roomName ,participantNames: room.participantsNames };
    this.chatWebViewScreen.setActiveRoom(roomView);
    this.chatWebViewScreen.displayChatRoomsMessages(ouputMessages);
    return messages;
  }

  selectedRoomsByUser(rooms: RoomOutputData[]): RoomOutputData[] {
    const pchatView: ChatDataViewModelDto = {
      rooms: rooms.map((e) => {
        return { name: e.roomName, roomId: e.roomId } as RoomViewModel;
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

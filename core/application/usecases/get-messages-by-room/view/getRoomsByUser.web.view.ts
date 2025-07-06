import { MessageOutputData } from "../interactor/getMessagesByRoom.response.data";
import { IGetMessagesByRoomView } from "../presenter/getMessagesByRoom.view";
import { MessageViewModel } from "../presenter/getMessagesByRoom.view.model";

export class GetMessagesByRoomClientView implements IGetMessagesByRoomView {
  messages: MessageViewModel[]=[];
  roomName: string ='';
  roomId: number =-1;

  render(messages: MessageViewModel[]): void {
    this.messages = messages;
  }
  
  setActiveRoom(id: number, name: string): void {
    this.roomId = id;
    this.roomName = name
  }

  receiveNewMessage(message: MessageOutputData): MessageOutputData {
    //for adding e2ee decrypt message in the client side presenter
    const messageInput: MessageViewModel = {
      content: message.message,
      participantName: message.authorName, roomId: message.chatRoomId
    };
    //check if the room is active (opened)
    if (message.chatRoomId === this.roomId)
      this.receiveMessage(messageInput);
    //else this.notifNewMessageOnInactiveRoom(message.chatRoomId);
    return message;
  }

  private receiveMessage(message: MessageViewModel): MessageViewModel | null {
    this.messages= [...this.messages, message];
    // this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoomMessages: newMessages };
    return message;
  }

}
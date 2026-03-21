import { IReactive } from "../../../../view";
import { MessageOutputData } from "../interactor/getMessagesByRoom.response.data";
import { IGetMessagesByRoomReactiveView } from "../presenter/getMessagesByRoom.view";
import { MessageViewModel, RoomMessagesViewModel } from "../presenter/getMessagesByRoom.view.model";

export class GetMessagesByRoomClientReactiveView implements IGetMessagesByRoomReactiveView {
  // messages: IReactive<MessageViewModel[]>;
  // roomName: string ='';
  // roomId: number =-1;

  private readonly vm: IReactive<RoomMessagesViewModel>;

  constructor(messagesReactive: IReactive<RoomMessagesViewModel>) {
    console.log('GetMessagesByRoomClientReactiveView: constructor called');
    this.vm = messagesReactive;
    this.vm.set({ messages: [], roomName: '', roomId: -1 } as RoomMessagesViewModel);
  }

  getViewModel(): RoomMessagesViewModel {
    return this.vm.data;
  }

  render(messages: MessageViewModel[]): void {
    this.vm.change(prev => ({ ...prev, messages: [...prev.messages, ...messages] }));
  }

  setActiveRoom(id: number, name: string): void {
    console.log('setActiveRoom: id: ', id, ' name: ', name);
    this.vm.change(prev => ({ ...prev, roomId: id, roomName: name }));
    console.log('setActiveRoom: vm after change: ', this.vm.data);
  }

  receiveNewMessage(message: MessageOutputData): MessageOutputData {
    //for adding e2ee decrypt message in the client side presenter
    const messageInput: MessageViewModel = {
      content: message.message,
      participantName: message.authorName, roomId: message.chatRoomId
    };
    //check if the room is active (opened)
    console.log('receiveNewMessage: current roomId: ', this.vm.data.roomId, ' message roomId: ', message.chatRoomId);
    if (message.chatRoomId === this.vm.data.roomId)
      this.receiveMessage(messageInput);
    //else this.notifNewMessageOnInactiveRoom(message.chatRoomId);
    return message;
  }

  private receiveMessage(message: MessageViewModel): MessageViewModel | null {
    this.vm.change(prev => ({ ...prev, messages: [...prev.messages, message] }));
    return message;
  }

}
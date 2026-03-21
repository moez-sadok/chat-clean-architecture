import { IReactive } from "../../../../view";
import { MessageOutputData } from "../interactor/getMessagesByRoom.response.data";
import { IGetMessagesByRoomReactiveView } from "../presenter/getMessagesByRoom.view";
import { MessageViewModel, RoomMessagesViewModel } from "../presenter/getMessagesByRoom.view.model";

export class GetMessagesByRoomClientReactiveView implements IGetMessagesByRoomReactiveView {

  readonly vm: IReactive<RoomMessagesViewModel>;

  constructor(messagesReactive: IReactive<RoomMessagesViewModel>) {
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
    this.vm.change(prev => ({ ...prev, roomId: id, roomName: name }));
  }

  receiveNewMessage(message: MessageOutputData): MessageOutputData {
    //for adding e2ee decrypt message in the client side presenter
    const messageInput: MessageViewModel = {
      content: message.message,
      participantName: message.authorName, roomId: message.chatRoomId
    };
    //check if the room is active (opened)
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
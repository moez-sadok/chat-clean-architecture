import { MessageOutputData } from "../interactor/getMessagesByRoom.response.data";
import { IGetMessagesByRoomView } from "../presenter/getMessagesByRoom.view";
import { MessageViewModel, RoomMessagesViewModel } from "../presenter/getMessagesByRoom.view.model";

// This is a simple client-side view implementation that directly manages the view model in memory.
// can be used in any UI framework, but it doesn't have built-in reactivity, so the presenter must trigger view updates manually.
// For Angular, React, Vue, etc., consider implementing a reactive view that integrates with the framework's state management and change detection.
export class GetMessagesByRoomClientView implements IGetMessagesByRoomView {

  readonly vm: RoomMessagesViewModel;

  constructor() {
    this.vm = { messages: [], roomName: '', roomId: -1 } as RoomMessagesViewModel;
  }

  render(messages: MessageViewModel[]): void {
    this.vm.messages = messages;
  }

  setActiveRoom(id: number, name: string): void {
    this.vm.roomId = id;
    this.vm.roomName = name
  }

  receiveNewMessage(message: MessageOutputData): MessageOutputData {
    //for adding e2ee decrypt message in the client side presenter
    const messageInput: MessageViewModel = {
      content: message.message,
      participantName: message.authorName, roomId: message.chatRoomId
    };
    //TO check respensability - 
    // check if the room is active (opened)
    if (message.chatRoomId === this.vm.roomId)
      this.receiveMessage(messageInput);
    //else this.notifNewMessageOnInactiveRoom(message.chatRoomId);
    return message;
  }

  getViewModel(): RoomMessagesViewModel {
    return this.vm;
  }

  private receiveMessage(message: MessageViewModel): MessageViewModel | null {
    this.vm.messages = [...this.vm.messages, message];
    return message;
  }

}
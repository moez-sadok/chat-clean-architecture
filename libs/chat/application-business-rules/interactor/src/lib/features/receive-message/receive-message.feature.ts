import { IChatRepository } from '../../components/chat-repository/repository-gateway';
import { SendMessageInputData } from '../../dtos/input.chat.data';
import { IChatServerPort } from '../../components/network/abstraction/chat-server.port';
import { IReceiveMessageInput } from './receive-message.controller.input';
import { IReceiveMessagePresenterOutput } from './receive-message.presenter.output';

export class ReceiveMessageFeature implements IReceiveMessageInput {

  constructor(
    private chatRepository: IChatRepository,
    private presenter: IReceiveMessagePresenterOutput,
    private chatServer: IChatServerPort
  ) { }
  
  receiveMessage(message: SendMessageInputData) {
      //  // db 
      //  const participantInRoom = this.chatRepository.getParticpantByUserAndRoom(message.roomId, message.userId);
      //  const croom = this.chatRepository.getChatRoomsById(message.roomId);
      //  const messagedto: MessageDto = {
      //    from: participantInRoom,
      //    message: message.message,
      //    room: croom
      //  };
      //  const newMessage = this.chatRepository.addMessage(messagedto);
      //  const messagedOutput: MessageOutputData = {
      //    authorName: newMessage.from.user.name,
      //    message: newMessage.message,
      //    chatRoomId: newMessage.room.id,
      //  };
      //  // chat server network (using notifiyer -> entities)
      //  this.chatServer.broadcast(messagedOutput);
      //  // presenter
      //  return this.presenter.receiveNewMessage(messagedOutput);
  }


}

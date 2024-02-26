import { IChatRepository } from '../../components/chat-repository/repository-gateway';
import { MessageOutputData } from '../../dtos/output.chat.data';
import { ISendMessageInput } from './sendMessage.controller.input';
import { SendMessageInputData } from '../../dtos/input.chat.data';
import { MessageDto } from '../../dtos/models/message.dto';
import { ISendMessagePresenterOutput } from './sendMessage.presenter.output';
import { IChatServerPort } from '../../components/network/chat-server.port';

export class SendMessageFeature implements ISendMessageInput {

  constructor(
    private chatRepository: IChatRepository,
    private presenter: ISendMessagePresenterOutput,
    private chatServer: IChatServerPort
  ) { }
  
  sendMessage(message: SendMessageInputData) {
       // db 
       const participantInRoom = this.chatRepository.getParticpantByUserAndRoom(message.roomId, message.userId);
       const croom = this.chatRepository.getChatRoomsById(message.roomId);
       const messagedto: MessageDto = {
         from: participantInRoom,
         message: message.message,
         room: croom
       };
       const newMessage = this.chatRepository.addMessage(messagedto);
       const messagedOutput: MessageOutputData = {
         authorName: newMessage.from.user.name,
         message: newMessage.message,
         chatRoomId: newMessage.room.id,
       };
       // chat server network (using notifiyer -> entities)
       this.chatServer.broadcast(messagedOutput);
       // presenter
       return this.presenter.receiveNewMessage(messagedOutput);
  }


}

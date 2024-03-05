import { IChatRepository } from '../../components/chat-repository/repository-gateway';
import { MessageOutputData } from '../../dtos/output.chat.data';
import { ISendMessageInput } from './sendMessage.controller.input';
import { SendMessageInputData } from '../../dtos/input.chat.data';
import { MessageDto } from '../../dtos/models/message.dto';
import { ISendMessagePresenterOutput } from './sendMessage.presenter.output';
import { IChatServerPort } from '../../components/network/abstraction/chat-server.port';
import { BotParticipant, Chatroom, IChatroom, IParticpant, Message, Participant } from '@chat-clean-architecture/chat/entreprise-business-rules/entities';
import { ChatroomDto } from '../../dtos/models/chatroom.dto';
import { INotifilyer } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
import { NotifiyerNetworkImpl } from '../../components/network/notifiyer.network';

export class SendMessageFeature implements ISendMessageInput {

  notifiyer: INotifilyer = new NotifiyerNetworkImpl(this.chatServer)

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
    // create the room entity
    const currRomm = this.createRoomEntity(croom);
    // chat server network (using notifiyer -> entities)
    this.chatServer.broadcast(messagedOutput, currRomm);
    // presenter
    return this.presenter.receiveNewMessage(messagedOutput);
  }

  private createRoomEntity(roomDto: ChatroomDto): IChatroom {
    const roomEntity: Chatroom = new Chatroom(roomDto.name, roomDto.id);
    const parts: Participant[] = Object.values(roomDto.participants).map(partDto => {
      //TODO : add a participant factory
      return partDto.isBot ? new BotParticipant(partDto.user.name, partDto.user.id, this.notifiyer)
        : new Participant(partDto.user.name, partDto.user.id, this.notifiyer);
    });
    //set participants
    roomEntity.setParticipants(parts);
    //set messages
    const roomMessages: Message[] = roomDto.messages
      ? roomDto.messages.map(rm => {
        const userName = rm.from.user.name;
        const partM: IParticpant = roomEntity.getParticipants()[userName];
        return new Message(rm.message, roomEntity, partM);
      }) : [];
    roomEntity.setMessages(roomMessages);
    //add to rooms
    return roomEntity;
  }


}

import { IChatRepository } from '../../components/chat-repository/repository-gateway';
import { MessageOutputData } from '../../dtos/output.chat.data';
import { ISendMessageInput } from './sendMessage.controller.input';
import { SendMessageInputData } from '../../dtos/input.chat.data';
import { MessageDto } from '../../dtos/models/message.dto';
import { ISendMessagePresenterOutput } from './sendMessage.presenter.output';
import { IChatServerPort } from '../../components/network/chat-server.port';
import { BotParticipant, Chatroom, IChatroom, IMessage, IParticpant, Message, Participant } from '@chat-clean-architecture/chat/entreprise-business-rules/entities';
import { ChatroomDto } from '../../dtos/models/chatroom.dto';
import { ParticpantDto } from '../../dtos/models/participant.dto';
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
      from: participantInRoom, message: message.message, room: croom
    };
    const newMessage = this.chatRepository.addMessage(messagedto);
    const messagedOutput: MessageOutputData = {
      authorName: newMessage.from.user.name, message: newMessage.message,
      chatRoomId: newMessage.room.id
    };
    if (!croom) console.log('Room not found: search in database or in service discovery from another chatserver instance')
    // create the room entity
    const currRomm = this.createRoomEntity(croom);
    this.broadcast(messagedOutput, currRomm); //old this.chatServer.broadcast(messagedOutput, currRomm);
    // presenter
    return this.presenter.receiveNewMessage(messagedOutput);
  }

  private broadcast(msg: MessageOutputData, currRoom: IChatroom): void {
    const currPart = currRoom.getParticipants()[msg.authorName];
    const message: IMessage = new Message(msg.message, currRoom, currPart);
    currRoom.broadcastMessage(message, currPart);
  }

  private createRoomEntity(roomDto: ChatroomDto): IChatroom {
    const roomEntity: Chatroom = new Chatroom(roomDto.name, roomDto.id);
    const parts: IParticpant[] = Object.values(roomDto.participants).map(partDto => {
      return this.participantFactory(partDto)
    });
    //set participants
    roomEntity.setParticipants(parts);
    // set messages (optional) // roomEntity.setMessages(this.toMessagesEntities(roomEntity,roomDto));
    return roomEntity;
  }

  private participantFactory(partDto: ParticpantDto): IParticpant {
    const client = this.chatServer.getConnectedClient(partDto.user.id);
    return partDto.isBot ?
      new BotParticipant(partDto.user.name, partDto.user.id, client)
      : new Participant(partDto.user.name, partDto.user.id, client);
  }

  // private toMessagesEntities(roomEntity: IChatroom, roomDto: ChatroomDto): IMessage[]{
  //   return roomDto.messages
  //     ? roomDto.messages.map(rm => {
  //       return this.messageFactory(rm, roomEntity);
  //     }) : [];
  // }

  // private messageFactory(msgDto: MessageDto, room: IChatroom): IMessage {
  //   return new Message(msgDto.message, room, room.getParticipants()[msgDto.from.user.name]);
  // }

}

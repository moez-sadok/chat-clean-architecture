import { SendMessageInputData } from "../../../dtos/input.chat.data";
import { ChatroomDto } from "../../../dtos/models/chatroom.dto";
import { MessageDto } from "../../../dtos/models/message.dto";
import { ParticpantDto } from "../../../dtos/models/participant.dto";
import { MessageOutputData } from "../../../dtos/output.chat.data";
import { BotParticipant } from "../../../entities/entities-impl/bot.participant";
import { Chatroom } from "../../../entities/entities-impl/chat-room.impl";
import { Message } from "../../../entities/entities-impl/message.impl";
import { Participant } from "../../../entities/entities-impl/participant.impl";
import { IChatroom } from "../../../entities/interfaces/chatroom";
import { IMessage } from "../../../entities/interfaces/message";
import { IParticpant } from "../../../entities/interfaces/participant";
import { IChatServerPort } from "../../../gateways";
import { IChatRepository } from "../../../repositories/chat-repository";
import { ISendMessageInput } from "./sendMessage.controller.input";
import { ISendMessagePresenterOutput } from "./sendMessage.presenter.output";

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
    if(!croom || croom.id == undefined) throw new Error('Send Message feature: Not found room id='+message.roomId);
    const messagedto: MessageDto = {
      from: participantInRoom, 
      message: message.message, 
      room: croom
    };
    const newMessage = this.chatRepository.addMessage(messagedto);
    const messagedOutput: MessageOutputData = {
      authorName: newMessage.from.user.name, message: newMessage.message,
      chatRoomId: croom.id, authorId : message.userId
    };
    if (!croom) console.log('Room not found: search in database or in service discovery from another chatserver instance')
    //TODO: Optimise by a cache or rooms and update connected/disconnect use cases
      // create the room entity
    const currRomm = this.createRoomEntity(croom,croom.id);
    this.broadcast(messagedOutput, currRomm); //old this.chatServer.broadcast(messagedOutput, currRomm);
    // presenter
    return this.presenter.receiveNewMessage(messagedOutput);
  }

  private broadcast(msg: MessageOutputData, currRoom: IChatroom): void {
    const currPart = currRoom.getParticipants()[msg.authorId];
    const message: IMessage = new Message(msg.message, currRoom, currPart);
    currRoom.broadcastMessage(message, currPart);
  }

  private createRoomEntity(roomDto: ChatroomDto,roomId: number): IChatroom {
    const roomEntity: IChatroom = new Chatroom(roomDto.name, roomId);
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

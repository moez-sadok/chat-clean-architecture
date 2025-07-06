import { ChatroomDto } from "../../../../dtos/models/chatroom.dto";
import { MessageDto } from "../../../../dtos/models/message.dto";
import { ParticpantDto } from "../../../../dtos/models/participant.dto";
import { BotParticipant } from "../../../../domain/entities/bot.participant";
import { Chatroom } from "../../../../domain/entities/chat-room.impl";
import { Message } from "../../../../domain/entities/message.impl";
import { Participant } from "../../../../domain/entities/participant.impl";
import { IChatroom } from "../../../../domain/interfaces/chatroom";
import { IMessage } from "../../../../domain/interfaces/message";
import { IParticpant } from "../../../../domain/interfaces/participant";
import { RoomsCacheManager } from "../../../../gateways";
import { IChatRepository } from "../../../ports/chat-repository";
import { ISendMessageInput } from "./sendMessage.controller.input";
import { ISendMessagePresenterOutput } from "./sendMessage.presenter.output";
import { SendMessageOutputData } from "./send-message.response.data";
import { SendMessageInputData } from "./send-message.request.data";
import { IChatServerPort } from "../../../ports/chat-server.port";

export class SendMessagePerfFeature implements ISendMessageInput {

  //TOTO inject it
  roomsCacheManager: RoomsCacheManager = new RoomsCacheManager();

  constructor(
    private chatRepository: IChatRepository,
    private presenter: ISendMessagePresenterOutput,
    private chatServer: IChatServerPort
  ) { }

  sendMessage(message: SendMessageInputData): Promise<SendMessageOutputData> {
    // let participantInRoom;
    // let messagedOutput: SendMessageOutputData;
    let currRoom: IChatroom;
    //check cache
    const cachedRoom = this.roomsCacheManager.getRoomFromCache(message.roomId);
    const participantInRoom = this.chatRepository.getParticpantByUserAndRoom(message.roomId, message.userId);
    const croom = this.chatRepository.getChatRoomsById(message.roomId);
    if (!croom || croom.id == undefined) throw new Error('Send Message feature: Not found room id=' + message.roomId);
    if (cachedRoom) {
      currRoom = cachedRoom;
    } else {
      //TODO: Optimise by a cache or rooms and update connected/disconnect use cases
      // create the room entity
      currRoom = this.createRoomEntity(croom, croom.id);
      //update cache
      this.roomsCacheManager.setRoomToCache(currRoom);
      this.roomsCacheManager.setUserIdToMapRoomCache(message.userId, croom.id);
      //is user connected (refacto to the connect use case)
      const isUserConnected = this.chatServer.getConnectedClient(message.userId);
      if (isUserConnected) this.roomsCacheManager.setChatClientToParticipantsOfRoomsCache(isUserConnected);
    }

    const messagedto: MessageDto = {
      from: participantInRoom,
      message: message.message,
      room: croom
    };
    const newMessage = this.chatRepository.addMessage(messagedto);
    const messagedOutput : SendMessageOutputData = {
      authorName: newMessage.from.user.name,
      message: newMessage.message,
      chatRoomId: croom.id,
      authorId: message.userId
    };
    if (!croom) console.log('Room not found: search in database or in service discovery from another chatserver instance')
    this.broadcast(messagedOutput, currRoom); //old this.chatServer.broadcast(messagedOutput, currRomm);
    // presenter
    // return this.presenter.receiveNewMessage(messagedOutput);
    return new Promise((resolve) => {
      return resolve(this.presenter.receiveNewMessage(messagedOutput));
    });
  }

  private broadcast(msg: SendMessageOutputData, currRoom: IChatroom): void {
    const currPart = currRoom.getParticipants()[msg.authorId];
    const message: IMessage = new Message(msg.message, currRoom, currPart);
    currRoom.broadcastMessage(message, currPart);
  }

  private createRoomEntity(roomDto: ChatroomDto, roomId: number): IChatroom {
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

}

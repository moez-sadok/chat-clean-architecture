
import { BotParticipant, Chatroom, IChatroom, IMessage, IParticpant, Message, Participant } from "@chat-clean-architecture/chat/entreprise-business-rules/entities";
import { INotifilyer } from "@chat-clean-architecture/chat/entreprise-business-rules/notifiyer";

import { MessageOutputData } from "../../dtos/output.chat.data";
import { IChatRepository } from "../../components/chat-repository/repository-gateway";
import { NotifiyerNetworkImpl } from "./notifiyer.network";
import { ChatClientPortImpl } from "./chat-client.port.impl";
import { IChatServerPort } from "../../components/network/chat-server.port";
import { IChatClient } from "../../components/network/chat-client.port";
import { IChatAppFacadePresenterOutput } from "../../entry-chat-facade/entry.facade.presenter";

export class ChatServerPortImpl implements IChatServerPort {

  private connectetdUsers: Record<number, IChatClient> = {};
  private rooms: Record<number, IChatroom> = {};//changed by rooms repository

  private notifiyer: INotifilyer; //TODO add it to DI

  constructor(
    private chatRepository: IChatRepository
  ) {
    this.notifiyer = new NotifiyerNetworkImpl(this);
    this.init();
  }

  getConnectedClients(): Record<number, IChatClient> {
    return this.connectetdUsers;
  }

  connectUser(client: IChatClient): boolean {
    const userId = client.getId();
    if (userId === null || userId === undefined) return false;
    if (!this.connectetdUsers[userId]) {
      this.connectetdUsers[userId] = client;
      return true;
    } else return false;
  }

  connectUserByID(userId: number, presenter: IChatAppFacadePresenterOutput): boolean {
    if (userId === null || userId === undefined) return false;
    const dbUser = this.chatRepository.getUserById(userId);
    if (!dbUser) return false;
    const client: IChatClient = new ChatClientPortImpl(dbUser.id,
      dbUser.name, presenter);

    if (!this.connectetdUsers[userId]) {
      this.connectetdUsers[userId] = client;
      return true;
    } else return false;
  }

  disconnectUser(userId: number): boolean {
    if (userId === null || userId === undefined) return false;
    if (!this.connectetdUsers[userId]) return false;
    delete this.connectetdUsers[userId];
    return true;
  }

  broadcast(msg: MessageOutputData): void {
    const currRoom = this.rooms[msg.chatRoomId];
    // const currRoom = this.chatRepository.getChatRoomsById(msg.chatRoomId);
    if (!currRoom) console.log('Room not found: search in database or in service discovery from another chatserver instance')
    const currPart = currRoom.getParticipants()[msg.authorName];
    const message: IMessage = new Message(msg.message, currRoom, currPart);
    currRoom.broadcastMessage(message, currPart);
  }

  private init(): void {
    const chatRooms = this.chatRepository.getChatRooms().map(roomDto => {
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
    });
    this.initServer(chatRooms);
  }

  initServer(rooms: IChatroom[]): void {
    const chatRooms: Record<number, IChatroom> = {};
    rooms.map(room => { chatRooms[room.getId()] = room; });
    this.rooms = chatRooms;
  }


}
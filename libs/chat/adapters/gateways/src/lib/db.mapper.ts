import { IDataAccess } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { ChatDataSerializer } from './utils/data.serializer';
import { IChatDatabase } from './interfaces/chat-database';
import { ChatroomTable } from './tables/chatroom.table';
import { ParticpantTable } from './tables/participant.table';
import { UserDto, ChatroomDto, MessageDto, ParticpantDto } from '@chat-clean-architecture/chat/entreprise-business-rules/dtos';

export class DataBaseMapper implements IDataAccess {
  private dbSerializer: ChatDataSerializer;

  constructor(private db: IChatDatabase) {
    this.dbSerializer = new ChatDataSerializer(db);
  }

  /** insertions */
  addMessage(message: MessageDto): MessageDto {
    if (!message.from.id) throw new Error('Add message miss attrs: from');
    if (message.room.id == undefined) throw new Error('Add message miss attrs: room');
    const tabelMessage = this.dbSerializer.desirializeMessage({
      ...message,
      date: new Date(),
    });
    const newMessage = this.db.insertMessage(tabelMessage);
    return { ...message, id: newMessage.id };
  }

  /** getters / selects */
  getUserById(userId: number): UserDto {
    return this.dbSerializer.serializeUser(this.db.getUserById(userId));
  }

  getChatRooms(): ChatroomDto[] {
    return this.db.getChatRooms().map(roomTable => this.dbSerializer.serializeRoom(roomTable))
  }

  getChatRoomsByUser(userId: number): ChatroomDto[] {
    if (userId === null || userId === undefined)
      throw new Error(' Get ChatRooms By User : user not found');
    const userParts = this.db.getParticipantsByUser(userId);
    const rooms = this.getRoomsByParticipants(userParts);
    const roomsTablearray = Object.keys(rooms).map((id) => rooms[parseInt(id)]);
    return roomsTablearray.map((r) => {
      return this.dbSerializer.serializeRoom(r);
    });
  }

  getMessagesByRoom(roomId: number): MessageDto[] {
    return this.db.getMessageByRoom(roomId)
      .map((m) => this.dbSerializer.serializeMessage(m));
  }

  getParticpantByUserAndRoom(roomId: number, userId: number): ParticpantDto {
    const partTable = this.db.getParticipantByRoomAndUser(roomId, userId);
    return this.dbSerializer.serializeParticipant(partTable);
  }

  getChatRoomsById(roomId: number): ChatroomDto {
    return this.dbSerializer.serializeRoom(this.db.getRoomById(roomId));
  }

  private getRoomsByParticipants(
    parts: ParticpantTable[]
  ): Record<number, ChatroomTable> {
    //to check (put in db)
    return parts.reduce((acc: Record<number, ChatroomTable>, curr) => {
      if (!acc[curr.chatRoomId]) {
        acc[curr.chatRoomId] = this.db.getRoomById(curr.chatRoomId);
      }
      return acc;
    }, {});
  }

  // getUsers(): UserDto[] {
  //   return this.db.getUses().map((ut) => this.dbSerializer.serializeUser(ut));
  // }

  // addChatRoom(chatRoom: ChatroomDto): void {
  //   const tabelroom = this.dbSerializer.desirializeRoom({ ...chatRoom });
  //   this.db.insertChatRoom(tabelroom);
  // }

  // addParticipant(participant: ParticpantDto): void {
  //   if (!participant.chatroom?.id || !participant.user.id)
  //     throw new Error('Add participant miss attrs');
  //   const tabelPart = this.dbSerializer.desirializeParticipant(participant);
  //   this.db.insertParticipant(tabelPart);
  // }

  // removeParticipant(participant: ParticpantDto): void {
  //   if (!participant.id) throw new Error("Can't remouve unfoud participant");
  //   this.db.removeParticipant(participant.id);
  // }

  // addUser(user: UserDto): void {
  //   if (!user?.id) throw new Error('Add user miss attrs');
  //   const tabelUser = this.dbSerializer.deserializeUser({ ...user });
  //   this.db.insertUser(tabelUser);
  // }
}

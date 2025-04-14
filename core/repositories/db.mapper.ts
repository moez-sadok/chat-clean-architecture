import { ChatDataSerializer } from './utils/data.serializer';
import { IChatDatabase } from './interfaces/chat-database';
import { ChatroomTable } from './tables/chatroom.table';
import { ParticpantTable } from './tables/participant.table';
import { IChatRepository } from './chat-repository';
import { ChatroomDto } from '../dtos/models/chatroom.dto';
import { MessageDto } from '../dtos/models/message.dto';
import { ParticpantDto } from '../dtos/models/participant.dto';
import { UserDto } from '../dtos/models/user.dto';

export class DataBaseMapper implements IChatRepository {
  private dbSerializer: ChatDataSerializer;

  constructor(private db: IChatDatabase) {
    this.dbSerializer = new ChatDataSerializer(db);
  }

  /** insertions */
  addMessage(message: MessageDto): MessageDto {
    if (message.from.id == undefined) throw new Error('Add message miss attrs: from');
    if (message.room.id == undefined) throw new Error('Add message miss attrs: room');
    const tabelMessage = this.dbSerializer.desirializeMessage({
      ...message,
      date: new Date(),
    });
    const newMessage = this.db.insertMessage(tabelMessage);
    return { ...message, id: newMessage.id };
  }

  /** getters / selects */
  getUserById(userId: number): UserDto | null {
    const dbUser = this.db.getUserById(userId);
    if (dbUser) return this.dbSerializer.serializeUser(this.db.getUserById(userId));
    else return null;
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
    return this.db.getMessagesByRoom(roomId)
      .map((m) => this.dbSerializer.serializeMessage(m));
  }

  getParticpantByUserAndRoom(roomId: number, userId: number): ParticpantDto {
    const partTable = this.db.getParticipantByRoomAndUser(roomId, userId);
    return this.dbSerializer.serializeParticipant(partTable);
  }

  getChatRoomsById(roomId: number): ChatroomDto | null {
    const dbRoom = this.db.getRoomById(roomId);
    if (dbRoom) return this.dbSerializer.serializeRoom(dbRoom);
    return null;
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

  getUsers(): UserDto[] {
    return this.db.getUses().map((ut) => this.dbSerializer.serializeUser(ut));
  }

  addChatRoom(chatRoom: ChatroomDto): Promise<ChatroomDto> {
    // const tabelroom = this.dbSerializer.desirializeRoom({ ...chatRoom });
    const dbRoom = this.db.insertChatRoom({ name: chatRoom.name , id :chatRoom.id});
    const roomDto = this.dbSerializer.serializeRoom(dbRoom);
    return new Promise((resolve) => resolve(roomDto));
  }

  addParticipant(participant: ParticpantDto): void {
    if (participant.chatroom?.id === undefined || participant.user.id === undefined)
      throw new Error('Add participant miss attrs');
    const tabelPart = this.dbSerializer.desirializeParticipant(participant);
    this.db.insertParticipant(tabelPart);
  }

  removeParticipant(participant: ParticpantDto): void {
    if (!participant.id) throw new Error("Can't remouve unfoud participant");
    this.db.removeParticipant(participant.id);
  }

  addUser(user: UserDto): Promise<UserDto> {
    if (!user?.id) throw new Error('Add user miss attrs');
    const tabelUser = this.dbSerializer.deserializeUser({ ...user });
    const userTable = this.db.insertUser(tabelUser);
    return new Promise((resolve) => resolve(this.dbSerializer.serializeUser(userTable)));
  }
}

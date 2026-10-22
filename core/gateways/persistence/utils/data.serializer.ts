import { ChatroomDto } from '../../../dtos/models/chatroom.dto';
import { MessageDto } from '../../../dtos/models/message.dto';
import { ParticipantDto } from '../../../dtos/models/participant.dto';
import { UserDto } from '../../../dtos/models/user.dto';
import { IChatDatabase } from '../interfaces/chat-database';
import { ChatroomTable } from '../tables/chatroom.table';
import { MessageTable } from '../tables/message.table';
import { ParticipantTable } from '../tables/participant.table';
import { UserTable } from '../tables/user.table';
//serialisation / desirialisation (utils for gateway part)
//serialisations hit the database, so they are async; desirialisations are pure.
export class ChatDataSerializer {

  //chatromm!: Chatroom;

  constructor(private db: IChatDatabase) { }

  /** Room without its messages: used when the caller only needs the room context. */
  public async serializeRoomWithoutMessages(oTable: ChatroomTable): Promise<ChatroomDto> {
    const parts = await this.db.getParticipantsByRoom(oTable.id);
    const users = await this.db.getUsersByIds([...new Set(parts.map((p) => p.userId))]);
    const usersById = new Map(users.map((u) => [u.id, u]));
    return {
      id: oTable.id,
      name: oTable.name,
      participants: parts.map((p) => this.toParticipantDto(p, usersById))
    };
  }

  /**
   * Serializes a batch of messages sharing the same room: the authors are read
   * in one batch and the room DTO is built once, instead of once per message.
   */
  public async serializeMessagesOfRoom(oTables: MessageTable[], roomDto: ChatroomDto): Promise<MessageDto[]> {
    const authors = await this.db.getParticipantsByIds([...new Set(oTables.map((m) => m.participantId))]);
    const users = await this.db.getUsersByIds([...new Set(authors.map((p) => p.userId))]);
    const usersById = new Map(users.map((u) => [u.id, u]));
    const authorsById = new Map(authors.map((p) => [p.id, p]));
    return oTables.map((m) => ({
      id: m.id,
      message: m.content,
      from: this.toParticipantDto(authorsById.get(m.participantId) as ParticipantTable, usersById),
      room: roomDto,
      date: m.created_at,
    }));
  }

  public async serializeRoom(oTable: ChatroomTable): Promise<ChatroomDto> {
    const [parts, messages] = await Promise.all([
      this.db.getParticipantsByRoom(oTable.id),
      this.db.getMessagesByRoom(oTable.id)
    ]);
    //one batch read for every author/participant of the room (no N+1)
    const messageParts = await this.db.getParticipantsByIds(messages.map((m) => m.participantId));
    const knownParts = [...parts, ...messageParts];
    const users = await this.db.getUsersByIds([...new Set(knownParts.map((p) => p.userId))]);
    const usersById = new Map(users.map((u) => [u.id, u]));
    const partsById = new Map(knownParts.map((p) => [p.id, p]));

    const serRoomDto: ChatroomDto = {
      id: oTable.id,
      name: oTable.name,
      participants: parts.map((p) => this.toParticipantDto(p, usersById))
    };
    const roomDto: ChatroomDto = {
      ...serRoomDto,
      messages: messages.map((m) => ({
        id: m.id,
        message: m.content,
        from: this.toParticipantDto(partsById.get(m.participantId) as ParticipantTable, usersById),
        room: serRoomDto,
        date: m.created_at,
      }))
    };
    return roomDto;
  }

  private toParticipantDto(oTable: ParticipantTable, usersById: Map<number, UserTable>): ParticipantDto {
    return {
      id: oTable.id,
      user: this.serializeUser(usersById.get(oTable.userId) as UserTable),
      isBot: oTable.isBot
    };
  }

  public serializeUser(oTable: UserTable): UserDto {
    return {
      id: oTable.id,
      name: oTable.name,
      email: oTable.email,
    };
  }

  public async serializeParticipant(oTable: ParticipantTable): Promise<ParticipantDto> {
    return {
      id: oTable.id,
      user: this.serializeUser(await this.db.getUserById(oTable.userId)),
      isBot: oTable.isBot
      //chatroom: this.serializeRoom(this.getRoomById(oTable.chatRoomId))
    };
  }

  public deserializeParticipant(part: ParticipantDto): ParticipantTable {
    if (
     // part.id == undefined ||
      part.chatroom?.id == undefined ||
      part.user?.id == undefined
    )
      throw new Error('deserializeMessage miss attrs');
    return {
      id: part.id || -1,
      chatRoomId: part.chatroom.id,
      userId: part.user.id,
      isBot : part.isBot
    };
  }

  public async serializeMessage(oTable: MessageTable): Promise<MessageDto> {
    const [participant, room] = await Promise.all([
      this.db.getParticipantById(oTable.participantId),
      this.db.getRoomById(oTable.roomId)
    ]);
    return {
      id: oTable.id,
      message: oTable.content,
      from: await this.serializeParticipant(participant),
      room: await this.serializeRoom(room),
      date: oTable.created_at,
    };
  }

  public async serializeMessageWithRoom(oTable: MessageTable, roomDto: ChatroomDto): Promise<MessageDto> {
    return {
      id: oTable.id,
      message: oTable.content,
      from: await this.serializeParticipant(
        await this.db.getParticipantById(oTable.participantId)
      ),
      room: roomDto,
      date: oTable.created_at,
    };
  }

  public deserializeMessage(message: MessageDto): MessageTable {
    if (message.from.id == undefined || message.room?.id == undefined)
      throw new Error('deserializeMessage miss attrs');
    return {
      id: message.id || 0,
      participantId: message.from.id,
      roomId: message?.room.id,
      content: message.message,
    };
  }

  public deserializeRoom(room: ChatroomDto): ChatroomTable {
    if (!room.id) throw new Error('deserialize room miss room id');
    return {
      id: room.id,
      name: room.name,
    };
  }

  public deserializeUser(uDto: UserDto): UserTable {
    if (!uDto.id) throw new Error('deserialize user miss user id');
    return {
      id: uDto.id,
      name: uDto.name,
      email: uDto.email,
    };
  }
}

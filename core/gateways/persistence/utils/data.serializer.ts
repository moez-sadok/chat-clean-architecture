// import { ChatroomDto, UserDto, ParticpantDto, MessageDto } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { ChatroomDto } from '../../../dtos/models/chatroom.dto';
import { MessageDto } from '../../../dtos/models/message.dto';
import { ParticpantDto } from '../../../dtos/models/participant.dto';
import { UserDto } from '../../../dtos/models/user.dto';
import { IChatDatabase } from '../interfaces/chat-database';
import { ChatroomTable } from '../tables/chatroom.table';
import { MessageTable } from '../tables/message.table';
import { ParticpantTable } from '../tables/participant.table';
import { UserTable } from '../tables/user.table';
//import { Chatroom } from '@chat-clean-architecture/chat/entreprise-business-rules/entities';
//serialisation / desirialisation (utils for gateway part)
export class ChatDataSerializer {

  //chatromm!: Chatroom;

  constructor(private db: IChatDatabase) { }

  public serializeRoom(oTable: ChatroomTable): ChatroomDto {
    const parts = this.db.getParticipantsByRoom(oTable.id);
    const messages = this.db.getMessagesByRoom(oTable.id);
    const serRoomDto : ChatroomDto= {
      id: oTable.id,
      name: oTable.name,
      participants: parts.map((p) => {
        return this.serializeParticipant(p);
      })
    };
    const roomDto : ChatroomDto = { ...serRoomDto, messages :messages.map(
      m => { return this.serializeMessageWithRoom(m,serRoomDto) }) }
    return roomDto;
  }

  public serializeUser(oTable: UserTable): UserDto {
    return {
      id: oTable.id,
      name: oTable.name,
      email: oTable.email,
    };
  }

  public serializeParticipant(oTable: ParticpantTable): ParticpantDto {
    return {
      id: oTable.id,
      user: this.serializeUser(this.db.getUserById(oTable.userId)),
      isBot: oTable.isBot
      //chatroom: this.serializeRoom(this.getRoomById(oTable.chatRoomId))
    };
  }

  public desirializeParticipant(part: ParticpantDto): ParticpantTable {
    if (
     // part.id == undefined ||
      part.chatroom?.id == undefined ||
      part.user?.id == undefined
    )
      throw new Error('desirializeMessage miss attrs');
    return {
      id: part.id || -1,
      chatRoomId: part.chatroom.id,
      userId: part.user.id,
      isBot : part.isBot
    };
  }

  public serializeMessage(oTable: MessageTable): MessageDto {
    return {
      id: oTable.id,
      message: oTable.content,
      from: this.serializeParticipant(
        this.db.getParticipantById(oTable.participantId)
      ),
      room: this.serializeRoom(this.db.getRoomById(oTable.roomId)),
      date: oTable.created_at,
    };
  }

  public serializeMessageWithRoom(oTable: MessageTable, roomDto: ChatroomDto): MessageDto {
    return {
      id: oTable.id,
      message: oTable.content,
      from: this.serializeParticipant(
        this.db.getParticipantById(oTable.participantId)
      ),
      room: roomDto,
      date: oTable.created_at,
    };
  }

  public desirializeMessage(message: MessageDto): MessageTable {
    if (message.from.id == undefined || message.room?.id == undefined)
      throw new Error('desirializeMessage miss attrs');
    return {
      id: message.id || 0,
      participantId: message.from.id,
      roomId: message?.room.id,
      content: message.message,
    };
  }

  public desirializeRoom(room: ChatroomDto): ChatroomTable {
    if (!room.id) throw new Error('desirialize room miss room id');
    return {
      id: room.id,
      name: room.name,
    };
  }

  public deserializeUser(uDto: UserDto): UserTable {
    if (!uDto.id) throw new Error('desirialize user miss user id');
    return {
      id: uDto.id,
      name: uDto.name,
      email: uDto.email,
    };
  }
}

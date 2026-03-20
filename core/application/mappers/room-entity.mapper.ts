import { BotParticipant } from '../../domain/entities/bot.participant';
import { Chatroom } from '../../domain/entities/chat-room.impl';
import { Participant } from '../../domain/entities/participant.impl';
import { IChatroom } from '../../domain/interfaces/chatroom';
import { IParticipant } from '../../domain/interfaces/participant';
import { IChatServerPort } from '../ports/chat-server.port';
import { ChatroomDto } from '../../dtos/models/chatroom.dto';
import { ParticipantDto } from '../../dtos/models/participant.dto';

export class RoomEntityMapper {

  constructor(private chatServer: IChatServerPort) {}

  toRoomEntity(roomDto: ChatroomDto): IChatroom {
    const roomEntity: IChatroom = new Chatroom(roomDto.name, roomDto.id);
    const participants: IParticipant[] = Object.values(roomDto.participants).map(partDto =>
      this.toParticipantEntity(partDto)
    );
    roomEntity.setParticipants(participants);
    return roomEntity;
  }

  private toParticipantEntity(partDto: ParticipantDto): IParticipant {
    const client = this.chatServer.getConnectedClient(partDto.user.id);
    return partDto.isBot
      ? new BotParticipant(partDto.user.name, partDto.user.id, client)
      : new Participant(partDto.user.name, partDto.user.id, client);
  }
}

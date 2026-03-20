import { ChatroomDto } from './chatroom.dto';
import { ParticipantDto } from './participant.dto';

export interface MessageDto {
  id?: number;
  from: ParticipantDto;
  room: ChatroomDto;
  message: string;
  date?: Date;
}

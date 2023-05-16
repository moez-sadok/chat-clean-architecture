import { ChatroomDto } from './chatroom.dto';
import { ParticpantDto } from './participant.dto';

export interface MessageDto {
  id?: number;
  from: ParticpantDto;
  room: ChatroomDto;
  message: string;
  date?: Date;
}

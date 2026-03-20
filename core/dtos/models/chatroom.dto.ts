import { MessageDto } from './message.dto';
import { ParticipantDto } from './participant.dto';

// Mediator
export interface ChatroomDto {
  id: number;
  name: string;
  participants: Record<number, ParticipantDto>;
  messages?: MessageDto[]; //last n 
}

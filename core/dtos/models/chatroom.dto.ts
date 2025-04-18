import { MessageDto } from './message.dto';
import { ParticpantDto } from './participant.dto';

// Mediator
export interface ChatroomDto {
  id: number;
  name: string;
  participants: Record<number, ParticpantDto>;
  messages?: MessageDto[]; //last n 
}

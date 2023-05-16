import { MessageDto } from './message';
import { ParticpantDto } from './participant.dto';

// Mediator
export interface ChatroomDto {
  id: number;
  name: string;
  participants: Record<number, ParticpantDto>;
  messages?: MessageDto[];
}

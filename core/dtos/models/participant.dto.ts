import { ChatroomDto } from './chatroom.dto';
import { UserDto } from './user.dto';

// Colleagues
export interface ParticipantDto {
  id?: number;
  user: UserDto;
  chatroom?: ChatroomDto | null;
  isBot?: boolean;
}

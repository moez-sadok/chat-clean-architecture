import { ChatroomDto } from './chatroom.dto';
import { UserDto } from './user.dto';

// Colleagues
export interface ParticpantDto {
  id?: number;
  user: UserDto;
  chatroom?: ChatroomDto | null;
  isBot?: boolean;
}

import { ChatroomDto } from '../../../../dtos/models/chatroom.dto';
import { MessageDto } from '../../../../dtos/models/message.dto';
import { ParticipantDto } from '../../../../dtos/models/participant.dto';

export interface ISendMessageRepository {
  getChatRoomsById(roomId: number): ChatroomDto | null;
  addMessage(message: MessageDto): MessageDto;
  getParticpantByUserAndRoom(roomId: number, userId: number): ParticipantDto;
}

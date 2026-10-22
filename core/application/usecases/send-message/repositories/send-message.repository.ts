import { ChatroomDto } from '../../../../dtos/models/chatroom.dto';
import { MessageDto } from '../../../../dtos/models/message.dto';
import { ParticipantDto } from '../../../../dtos/models/participant.dto';

export interface ISendMessageRepository {
  getChatRoomsById(roomId: number): Promise<ChatroomDto | null>;
  addMessage(message: MessageDto): Promise<MessageDto>;
  getParticipantByUserAndRoom(roomId: number, userId: number): Promise<ParticipantDto>;
}

import { MessageDto } from "../../../dtos/models/message.dto";
import { IChatroom } from "../../../domain/interfaces/chatroom";
import { Message } from "../../../domain/entities/message.impl";
import { RoomEntityMapper } from "../../mappers/room-entity.mapper";
import { ISendMessageRepository } from "./repositories/send-message.repository";
import { IChatServerPort } from "../../ports/chat-server.port";
import { ISendMessageInput } from "./send-message.input";
import { ISendMessagePresenterOutput } from "./send-message.output";
import { SendMessageOutputData } from "./send-message.response";
import { SendMessageInputData } from "./send-message.request";

export class SendMessageUseCase implements ISendMessageInput {

  private roomEntityMapper: RoomEntityMapper;

  constructor(
    private chatRepository: ISendMessageRepository,
    private presenter: ISendMessagePresenterOutput,
    chatServer: IChatServerPort
  ) {
    this.roomEntityMapper = new RoomEntityMapper(chatServer);
  }

  async sendMessage(message: SendMessageInputData): Promise<SendMessageOutputData> {
    const roomDto = await this.chatRepository.getChatRoomsById(message.roomId);
    if (!roomDto) throw new Error('SendMessage: room not found id=' + message.roomId);
    const author = await this.chatRepository.getParticipantByUserAndRoom(message.roomId, message.userId);

    const messageDto: MessageDto = { from: author, message: message.message, room: roomDto };
    const savedMessage = await this.chatRepository.addMessage(messageDto);
    const output: SendMessageOutputData = {
      authorName: savedMessage.from.user.name,
      message: savedMessage.message,
      chatRoomId: roomDto.id,
      authorId: message.userId
    };

    // the room entity is rebuilt on every message, so it always holds the clients online right now
    this.broadcast(output, this.roomEntityMapper.toRoomEntity(roomDto));
    return this.presenter.receiveNewMessage(output);
  }

  private broadcast(msg: SendMessageOutputData, room: IChatroom): void {
    const author = room.getParticipants()[msg.authorId];
    room.broadcastMessage(new Message(msg.message, room, author), author);
  }
}

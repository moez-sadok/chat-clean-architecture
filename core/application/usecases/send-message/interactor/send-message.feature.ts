import { MessageDto } from "../../../../dtos/models/message.dto";
import { IChatroom } from "../../../../domain/interfaces/chatroom";
import { IMessage } from "../../../../domain/interfaces/message";
import { Message } from "../../../../domain/entities/message.impl";
import { RoomEntityMapper } from "../../../../application/mappers/room-entity.mapper";
import { ISendMessageRepository } from "../repositories/send-message.repository";
import { IChatServerPort } from "../../../ports/chat-server.port";
import { ISendMessageInput } from "./sendMessage.controller.input";
import { ISendMessagePresenterOutput } from "./sendMessage.presenter.output";
import { SendMessageOutputData } from "./send-message.response.data";
import { SendMessageInputData } from "./send-message.request.data";

export class SendMessageFeatureV1 implements ISendMessageInput {

  private roomEntityMapper: RoomEntityMapper;

  constructor(
    private chatRepository: ISendMessageRepository,
    private presenter: ISendMessagePresenterOutput,
    private chatServer: IChatServerPort
  ) {
    this.roomEntityMapper = new RoomEntityMapper(chatServer);
  }

  sendMessage(message: SendMessageInputData): Promise<SendMessageOutputData> {
    const participantInRoom = this.chatRepository.getParticpantByUserAndRoom(message.roomId, message.userId);
    const croom = this.chatRepository.getChatRoomsById(message.roomId);
    if (!croom || croom.id == undefined) throw new Error('SendMessage: room not found id=' + message.roomId);

    const messagedto: MessageDto = { from: participantInRoom, message: message.message, room: croom };
    const newMessage = this.chatRepository.addMessage(messagedto);
    const messagedOutput: SendMessageOutputData = {
      authorName: newMessage.from.user.name,
      message: newMessage.message,
      chatRoomId: croom.id,
      authorId: message.userId
    };

    const currRoom: IChatroom = this.roomEntityMapper.toRoomEntity(croom);
    this.broadcast(messagedOutput, currRoom);
    return Promise.resolve(this.presenter.receiveNewMessage(messagedOutput));
  }

  private broadcast(msg: SendMessageOutputData, currRoom: IChatroom): void {
    const currPart = currRoom.getParticipants()[msg.authorId];
    const message: IMessage = new Message(msg.message, currRoom, currPart);
    currRoom.broadcastMessage(message, currPart);
  }
}

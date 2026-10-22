
import { IChatRepository } from "../../ports/chat-repository";
import { IGetMessagesByRoomInput } from "./get-messages-by-room.input";
import { IGetMessagesByRoomPresenterOutput } from "./get-messages-by-room.output";
import { GetRoomMessagesInputData } from "./get-messages-by-room.request";
import { GetMessagesOutputData, MessageOutputData, RoomOutputData } from "./get-messages-by-room.response";

export class GetMessagesByRoomUseCase implements IGetMessagesByRoomInput {

  constructor(
    private chatRepository: IChatRepository,
    private presenter: IGetMessagesByRoomPresenterOutput
  ) { }

  async getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<GetMessagesOutputData> {
    // console.log('getChatRoomsMessages', room);
    const roomDto = await this.chatRepository.getChatRoomsById(room.roomId);
    if (!roomDto) throw new Error('Not existing room id=' + room.roomId);
    const roomMessages = await this.chatRepository.getMessagesByRoom(room.roomId);
    const messages = roomMessages.map((m) => {
      return {
        authorName: m.from.user.name,
        message: m.message,
        chatRoomId: m.room.id,
        authorId: m.from.user.id,
      } as MessageOutputData;
    });
    const croom: RoomOutputData = {
      roomId: room.roomId,
      roomName: roomDto.name,
      participantsNames: Object.values(roomDto.participants).map(p => p.user.name)
    };
    return this.presenter.presentMessages(messages, croom);
  }


}

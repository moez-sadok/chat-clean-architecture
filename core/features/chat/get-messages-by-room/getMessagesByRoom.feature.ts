import { GetRoomMessagesInputData } from "../../../dtos/input.chat.data";
import { MessageOutputData, RoomOutputData } from "../../../dtos/output.chat.data";
import { IChatRepository } from "../../../repositories/chat-repository";
import { IGetMessagesByRoomInput } from "./getMessagesByRoom.controller.input";
import { IGetMessagesByRoomPresenterOutput } from "./getMessagesByRoom.presenter.output";

export class GetMessagesByRoomFeature implements IGetMessagesByRoomInput {

  constructor(
    private chatRepository: IChatRepository,
    private presenter: IGetMessagesByRoomPresenterOutput
  ) { }

  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<MessageOutputData[]> {
    const messagesByRoom = this.chatRepository.getMessagesByRoom(room.roomId);
    const roomDto = this.chatRepository.getChatRoomsById(room.roomId);
    if(!roomDto) throw new Error('Not existing room id='+room.roomId)
    const messages = messagesByRoom.map((m) => {
      return {
        authorName: m.from.user.name,
        message: m.message,
        chatRoomId: m.room.id,
      } as MessageOutputData;
    });
    const croom: RoomOutputData = {
      roomId: room.roomId, roomName: room.roomName,
      participantsNames: Object.values(roomDto.participants).map(p => p.user.name)
    };
    return new Promise((resolve) => {
      resolve(this.presenter.selectChatRoomsMessages(messages, croom));
    });
  }


}

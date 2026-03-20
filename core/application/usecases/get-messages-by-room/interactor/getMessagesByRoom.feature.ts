
import { IChatRepository } from "../../../ports/chat-repository";
import { GetRoomsByUserResponseData } from "../../get-rooms-by-user";
import { IGetMessagesByRoomInput } from "./getMessagesByRoom.controller.input";
import { IGetMessagesByRoomPresenterOutput } from "./getMessagesByRoom.presenter.output";
import { GetRoomMessagesInputData } from "./getMessagesByRoom.request.data";
import { GetMessagesOutputData, MessageOutputData } from "./getMessagesByRoom.response.data";

export class GetMessagesByRoomUseCase implements IGetMessagesByRoomInput {

  constructor(
    private chatRepository: IChatRepository,
    private presenter: IGetMessagesByRoomPresenterOutput
  ) { }

  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<GetMessagesOutputData> {
    // const messagesByRoom = this.chatRepository.getMessagesByRoom(room.roomId);
    // console.log('getChatRoomsMessages', room);
    const roomDto = this.chatRepository.getChatRoomsById(room.roomId);
    if (!roomDto) throw new Error('Not existing room id=' + room.roomId);
    const messages = this.chatRepository.getMessagesByRoom(room.roomId).map((m) => {
      return {
        authorName: m.from.user.name,
        message: m.message,
        chatRoomId: m.room.id,
        authorId: m.from.user.id,
      } as MessageOutputData;
    });
    const croom: GetRoomsByUserResponseData = {
      roomId: room.roomId,
      roomName: roomDto.name,
      participantsNames: Object.values(roomDto.participants).map(p => p.user.name)
    };
    return new Promise((resolve) => {
      resolve(this.presenter.presentMessages(messages, croom));
    });
  }


}

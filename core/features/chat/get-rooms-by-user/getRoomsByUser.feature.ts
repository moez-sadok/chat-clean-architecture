
import { GetRoomsByUserInputData } from "../../../dtos/input.chat.data";
import { RoomOutputData } from "../../../dtos/output.chat.data";
import { IChatRepository } from "../../../repositories/chat-repository";
import { IGetRoomsByUserInput } from "./getRoomsByUser.controller.input";
import { IGetRoomsByUserPresenterOutput } from "./getRoomsByUser.presenter.output";

export class GetRoomsByUserFeature implements IGetRoomsByUserInput {

  constructor(
    private chatRepository: IChatRepository,
    private presenter: IGetRoomsByUserPresenterOutput
  ) { }

  getRoomsByUser(user: GetRoomsByUserInputData): Promise<RoomOutputData[]> {
    const rooms = this.chatRepository.getChatRoomsByUser(user.userId).map((r) => {
      return {
        roomId: r.id,
        roomName: r.name
      } as RoomOutputData;
    });
    return new Promise((resolve) => {
      resolve(this.presenter.selectedRoomsByUser(rooms));
    });
  }

}

import { IGetRoomsByUserRequester } from "./get-rooms-by-user.input";
import { GetRoomsByUserRequestData } from "./get-rooms-by-user.request";
import { GetRoomsByUserResponseData } from "./get-rooms-by-user.response";
import { IChatRoomsRepository } from "./repositories/get-rooms-by-user.repository";
import { IGetRoomsByUserPresenter } from "./get-rooms-by-user.output";

export class GetRoomsByUserUseCase implements IGetRoomsByUserRequester {

  constructor(
    private roomsRepository: IChatRoomsRepository,
    private presenter: IGetRoomsByUserPresenter
  ) { }

  async getRoomsByUser(user: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
    const userRooms = await this.roomsRepository.getChatRoomsByUser(user.userId);
    const rooms = userRooms.map((r) => ({ roomId: r.id, roomName: r.name }) as GetRoomsByUserResponseData);
    return this.presenter.present(rooms);
  }

}

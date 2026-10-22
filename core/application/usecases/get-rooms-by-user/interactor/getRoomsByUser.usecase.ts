import { IGetRoomsByUserRequester } from "./getRoomsByUser.requester";
import { GetRoomsByUserRequestData } from "./getRoomsByUser.request.data";
import { GetRoomsByUserResponseData } from "./getRoomsByUser.response.data";
import { IChatRoomsRepository } from "../repositories/user-rooms.repository";
import { IGetRoomsByUserPresenter } from "../controller/getRoomsByUser.presenter";

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

import { IGetRoomsByUserRequester } from "./getRoomsByUser.requester";
import { GetRoomsByUserRequestData } from "./getRoomsByUser.request.data";
import { GetRoomsByUserResponseData } from "./getRoomsByUser.response.data";
import { IChatRoomsRepository } from "../repositories/user-rooms.repository";

export class GetRoomsByUserUseCase implements IGetRoomsByUserRequester {

  constructor(
    private roomsRepository: IChatRoomsRepository
  ) { }

  async getRoomsByUser(user: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
    const userRooms = await this.roomsRepository.getChatRoomsByUser(user.userId);
    return userRooms.map((r) => {
      return {
        roomId: r.id,
        roomName: r.name
      } as GetRoomsByUserResponseData;
    });
  }

}

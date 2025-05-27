import { IGetRoomsByUserRequester } from "./getRoomsByUser.requester";
import { GetRoomsByUserRequestData } from "./getRoomsByUser.request.data";
import { GetRoomsByUserResponseData } from "./getRoomsByUser.response.data";
import { IChatRoomsRepository } from "../repositories/user-rooms.repository";

export class GetRoomsByUserFeature implements IGetRoomsByUserRequester {

  constructor(
    private chatRepository: IChatRoomsRepository
  ) { }

  getRoomsByUser(user: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
    const rooms = this.chatRepository.getChatRoomsByUser(user.userId).map((r) => {
      return {
        roomId: r.id,
        roomName: r.name
      } as GetRoomsByUserResponseData;
    });
    return new Promise((resolve) => {
      resolve(rooms);
    });
  }

}

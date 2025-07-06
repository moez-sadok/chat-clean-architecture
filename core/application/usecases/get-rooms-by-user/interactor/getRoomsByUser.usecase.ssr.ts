import { IGetRoomsByUserSSRRequester } from "./getRoomsByUser.requester";
import { GetRoomsByUserRequestData } from "./getRoomsByUser.request.data";
import { GetRoomsByUserResponseData } from "./getRoomsByUser.response.data";
import { IChatRoomsRepository } from "../repositories/user-rooms.repository";
import { IGetRoomsByUserSSRPresenter } from "../controller/getRoomsByUser.presenter";

//Optional (the presenter can be used also by the controller as api or ui)
//but this respect more the clean architecture flow (p72, p.273)
export class GetRoomsByUserSSRFeature implements IGetRoomsByUserSSRRequester {

  constructor(
    private chatRepository: IChatRoomsRepository,
    private presenter : IGetRoomsByUserSSRPresenter
  ) { }

  getRoomsByUser(user: GetRoomsByUserRequestData):void{
    const rooms = this.chatRepository.getChatRoomsByUser(user.userId).map((r) => {
      return {
        roomId: r.id,
        roomName: r.name
      } as GetRoomsByUserResponseData;
    });
    this.presenter.present(rooms)
  }

}

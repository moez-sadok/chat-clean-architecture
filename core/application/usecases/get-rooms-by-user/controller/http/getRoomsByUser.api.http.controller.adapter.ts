import { IHttpController } from "../../../../../controllers";
import { GetRoomsByUserRequestData } from "../../interactor/getRoomsByUser.request.data";
import { IGetRoomsByUserRequester } from "../../interactor/getRoomsByUser.requester";
import { GetRoomsByUserResponseData } from "../../interactor/getRoomsByUser.response.data";
import { IGetRoomsByUserPresenter } from "../getRoomsByUser.presenter";

export class GetUserRoomsApiHttpControllerAdapter implements IHttpController {

  constructor(
    public usecase: IGetRoomsByUserRequester,//InputBoundary
    public presenterApi: IGetRoomsByUserPresenter//OutputBoundary
  ) {}

  async handle(input: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
    const rooms = await this.usecase.getRoomsByUser(input);
    return this.presenterApi.present(rooms);
  }

}

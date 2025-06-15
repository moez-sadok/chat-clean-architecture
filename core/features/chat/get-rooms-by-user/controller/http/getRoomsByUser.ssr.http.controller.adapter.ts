
import { IHttpController } from "../../../../../controllers";
import { GetRoomsByUserRequestData } from "../../interactor/getRoomsByUser.request.data";
import { IGetRoomsByUserSSRRequester } from "../../interactor/getRoomsByUser.requester";
import { IGetRoomsByUserSSRView } from "../../presenter/getRoomsByUser.view";
import { IGetRoomsByUserSSRPresenter } from "../getRoomsByUser.presenter";
//ssr
export class GetUserRoomsSSRHttpControllerAdapter implements IHttpController {

  constructor(
    public usecase: IGetRoomsByUserSSRRequester,//InputBoundary
    public presenter: IGetRoomsByUserSSRPresenter,//OutputBoundary
    public view: IGetRoomsByUserSSRView//View
  ) {}

  async handle(input: GetRoomsByUserRequestData): Promise<string> {
    this.usecase.getRoomsByUser(input,this.presenter);
    return this.view.render(this.presenter.getViewModel());
  }

}

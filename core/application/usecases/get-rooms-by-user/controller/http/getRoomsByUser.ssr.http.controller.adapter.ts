import { IHttpController } from "../../../../../controllers";
import { GetRoomsByUserRequestData } from "../../interactor/getRoomsByUser.request.data";
import { IGetRoomsByUserRequester } from "../../interactor/getRoomsByUser.requester";
import { IGetRoomsByUserSSRView } from "../../presenter/getRoomsByUser.view";
import { IGetRoomsByUserSSRPresenter } from "../getRoomsByUser.presenter";

// Same use case as the API, wired to the SSR presenter: the controller renders its view model.
export class GetUserRoomsSSRHttpControllerAdapter implements IHttpController {

  constructor(
    public usecase: IGetRoomsByUserRequester,
    public presenter: IGetRoomsByUserSSRPresenter,
    public view: IGetRoomsByUserSSRView
  ) {}

  async handle(input: GetRoomsByUserRequestData): Promise<string> {
    await this.usecase.getRoomsByUser(input);
    return this.view.render(this.presenter.getViewModel());
  }

}

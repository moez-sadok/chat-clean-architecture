import { IHttpController } from "../../../../controllers";
import { GetRoomsByUserRequestData } from "../get-rooms-by-user.request";
import { IGetRoomsByUserRequester } from "../get-rooms-by-user.input";
import { IGetRoomsByUserSSRView } from "../presenter/get-rooms-by-user.view";
import { IGetRoomsByUserSSRPresenter } from "../get-rooms-by-user.output";

// Same use case as the API, wired to the SSR presenter: the controller renders its view model.
export class GetUserRoomsSSRHttpControllerAdapter implements IHttpController<GetRoomsByUserRequestData, string> {

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

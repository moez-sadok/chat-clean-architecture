import { IHttpController } from "../../../../../controllers";
import { IGetMessagesByRoomInput } from "../../interactor/getMessagesByRoom.controller.input";
import { IGetMessagesByRoomPresenterOutput } from "../../interactor/getMessagesByRoom.presenter.output";
import { GetRoomMessagesInputData } from "../../interactor/getMessagesByRoom.request.data";
import { GetMessagesOutputData } from "../../interactor/getMessagesByRoom.response.data";

export class GetRoomMessagesApiHttpControllerAdapter implements IHttpController {

  constructor(
    public usecase: IGetMessagesByRoomInput,//InputBoundary
    public presenterApi: IGetMessagesByRoomPresenterOutput//OutputBoundary
  ) {}

  async handle(input: GetRoomMessagesInputData): Promise<GetMessagesOutputData> {
    const res = await this.usecase.getChatRoomsMessages(input);
    return this.presenterApi.presentMessages(
      res.messages,{roomName :res.roomName,roomId: input.roomId});
  }

}


import { IHttpController } from "../../../../../controllers";
import { IGetMessagesByRoomPresenterOutput } from "../../interactor/getMessagesByRoom.presenter.output";

export class GetRoomMessagesAPIHttpControllerClientAdapter implements IHttpController {

  constructor(public presenter: IGetMessagesByRoomPresenterOutput) { }

  async handle(data: any): Promise<any> {
    this.presenter.presentMessages(data.messages,{roomName: data.roomName,roomId:data.roomId});
  }

}

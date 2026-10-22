import { IHttpController } from "../../../../../controllers";
import { IGetMessagesByRoomInput } from "../../interactor/getMessagesByRoom.controller.input";
import { GetRoomMessagesInputData } from "../../interactor/getMessagesByRoom.request.data";
import { GetMessagesOutputData } from "../../interactor/getMessagesByRoom.response.data";

// The use case presents through its output port: the controller returns what it presented.
export class GetRoomMessagesApiHttpControllerAdapter implements IHttpController {

  constructor(public usecase: IGetMessagesByRoomInput) {}

  handle(input: GetRoomMessagesInputData): Promise<GetMessagesOutputData> {
    return this.usecase.getChatRoomsMessages(input);
  }

}

import { IHttpController } from "../../../../controllers";
import { IGetMessagesByRoomInput } from "../get-messages-by-room.input";
import { GetRoomMessagesInputData } from "../get-messages-by-room.request";
import { GetMessagesOutputData } from "../get-messages-by-room.response";

// The use case presents through its output port: the controller returns what it presented.
export class GetRoomMessagesApiHttpControllerAdapter implements IHttpController<GetRoomMessagesInputData, GetMessagesOutputData> {

  constructor(public usecase: IGetMessagesByRoomInput) {}

  handle(input: GetRoomMessagesInputData): Promise<GetMessagesOutputData> {
    return this.usecase.getChatRoomsMessages(input);
  }

}

import { IHttpController } from "../../../../controllers";
import { IGetUserByIdInput } from "../get-user-by-id.input";
import { GetUserByIdInputData } from "../get-user-by-id.request";
import { UserOutputData } from "../get-user-by-id.response";

// The use case presents through its output port: the controller returns what it presented.
export class GetUserByIdApiHttpControllerAdapter implements IHttpController<GetUserByIdInputData, UserOutputData | null> {

  constructor(public usecase: IGetUserByIdInput) {}

  handle(input: GetUserByIdInputData): Promise<UserOutputData | null> {
    return this.usecase.getUser(input.userId);
  }

}

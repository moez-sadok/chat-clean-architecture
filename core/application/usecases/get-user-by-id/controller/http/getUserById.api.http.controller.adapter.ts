import { IHttpController } from "../../../../../controllers";
import { IGetUserByIdInput } from "../../interactor/getUserById.controller.input";
import { GetUserByIdInputData } from "../../interactor/getUserById.request.data";
import { UserOutputData } from "../../interactor/getUserById.response.data";

// The use case presents through its output port: the controller returns what it presented.
export class GetUserByIdApiHttpControllerAdapter implements IHttpController {

  constructor(public usecase: IGetUserByIdInput) {}

  handle(input: GetUserByIdInputData): Promise<UserOutputData | null> {
    return this.usecase.getUser(input.userId);
  }

}

import { IHttpController } from "../../../../../controllers";
import { IGetUserByIdInput } from "../../interactor/getUserById.controller.input";
import { IGetUserByIdPresenterOutput } from "../../interactor/getUserById.presenter.output";
import { GetUserByIdInputData } from "../../interactor/getUserById.request.data";
import { UserOutputData } from "../../interactor/getUserById.response.data";

export class GetUserByIdApiHttpControllerAdapter implements IHttpController {

  constructor(
    public usecase: IGetUserByIdInput,//InputBoundary
    public presenterApi: IGetUserByIdPresenterOutput//OutputBoundary
  ) {}

  async handle(input: GetUserByIdInputData): Promise<UserOutputData> {
    // const res = await this.usecase.getUser(input);
    const res = await this.usecase.getUser(input.userId);
    return this.presenterApi.selectedUser(res);
  }

}

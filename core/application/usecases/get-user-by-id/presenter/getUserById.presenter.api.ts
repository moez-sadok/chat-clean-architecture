import { IGetUserByIdPresenterOutput } from "../interactor/getUserById.presenter.output";
import { UserOutputData } from "../interactor/getUserById.response.data";

export class GetUserByIdPresenterAPI implements IGetUserByIdPresenterOutput {
  selectedUser(user: UserOutputData): UserOutputData {
    return user;
  }
}
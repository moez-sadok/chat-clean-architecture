import { IGetUserByIdPresenterOutput } from "../interactor/getUserById.presenter.output";
import { UserOutputData } from "../interactor/getUserById.response.data";
import { IGetUserByIdView } from "./getUserById.view";

export class UserByIdPresenterUi implements IGetUserByIdPresenterOutput {

  constructor(public view: IGetUserByIdView) { }

  selectedUser(user: UserOutputData): UserOutputData {
    this.view.setActiveUser(user);
    return user;
  }

}

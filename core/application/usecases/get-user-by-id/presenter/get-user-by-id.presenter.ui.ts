import { IGetUserByIdPresenterOutput } from "../get-user-by-id.output";
import { UserOutputData } from "../get-user-by-id.response";
import { IGetUserByIdView } from "./get-user-by-id.view";

export class UserByIdPresenterUi implements IGetUserByIdPresenterOutput {

  constructor(public view: IGetUserByIdView) { }

  selectedUser(user: UserOutputData): UserOutputData {
    this.view.setActiveUser(user);
    return user;
  }

}

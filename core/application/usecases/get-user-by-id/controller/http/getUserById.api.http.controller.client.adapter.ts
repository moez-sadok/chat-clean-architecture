
import { IHttpController } from "../../../../../controllers";
import { IGetUserByIdPresenterOutput } from "../../interactor/getUserById.presenter.output";

export class GetUserByIdAPIHttpControllerClientAdapter implements IHttpController {

  constructor(public presenter: IGetUserByIdPresenterOutput) { }

  async handle(data: any): Promise<any> {
    this.presenter.selectedUser(data);
  }

}

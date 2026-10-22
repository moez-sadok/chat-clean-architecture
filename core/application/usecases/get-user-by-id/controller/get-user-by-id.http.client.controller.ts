import { IHttpController } from "../../../../controllers";
import { IGetUserByIdPresenterOutput } from "../get-user-by-id.output";
import { UserOutputData } from "../get-user-by-id.response";

// SPA side: the API response is handed to the UI presenter, which updates the view.
export class GetUserByIdAPIHttpControllerClientAdapter implements IHttpController<UserOutputData | null, void> {

  constructor(public presenter: IGetUserByIdPresenterOutput) { }

  async handle(response: UserOutputData | null): Promise<void> {
    this.presenter.selectedUser(response);
  }

}

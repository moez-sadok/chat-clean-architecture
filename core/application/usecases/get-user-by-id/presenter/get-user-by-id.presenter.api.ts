import { IGetUserByIdPresenterOutput } from "../get-user-by-id.output";
import { UserOutputData } from "../get-user-by-id.response";

export class GetUserByIdPresenterAPI implements IGetUserByIdPresenterOutput {
  selectedUser(user: UserOutputData): UserOutputData {
    return user;
  }
}
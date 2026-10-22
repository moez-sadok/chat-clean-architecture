import { GetUserByIdViewModelDto } from "./get-user-by-id.view.model";

export interface IGetUserByIdView {
  activeUser: GetUserByIdViewModelDto | null;
  setActiveUser(user: GetUserByIdViewModelDto | null): void;
}


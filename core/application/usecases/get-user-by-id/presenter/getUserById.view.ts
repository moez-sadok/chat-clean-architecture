import { GetUserByIdViewModelDto } from "./getUserById.view.model";

export interface IGetUserByIdView {
  activeUser: GetUserByIdViewModelDto | null;
  setActiveUser(user: GetUserByIdViewModelDto | null): void;
}


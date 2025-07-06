import { UserOutputData } from "./getUserById.response.data";

export interface IGetUserByIdPresenterOutput {
    selectedUser(user: UserOutputData | null): UserOutputData;
}
import { UserOutputData } from "./get-user-by-id.response";

export interface IGetUserByIdPresenterOutput {
    selectedUser(user: UserOutputData | null): UserOutputData;
}
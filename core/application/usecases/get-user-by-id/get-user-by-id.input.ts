import { UserOutputData } from "./get-user-by-id.response";

export interface IGetUserByIdInput {
  getUser(userId: number):Promise<UserOutputData | null> ;
}

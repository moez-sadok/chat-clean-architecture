import { UserOutputData } from "./getUserById.response.data";

export interface IGetUserByIdInput {
  getUser(userId: number):Promise<UserOutputData | null> ;
}

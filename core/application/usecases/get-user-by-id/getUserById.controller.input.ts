import { UserOutputData } from "../../../dtos/output.chat.data";

export interface IGetUserByIdInput {
  getUser(userId: number):Promise<UserOutputData | null> ;
}

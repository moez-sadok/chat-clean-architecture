import { GetRoomsByUserInputData } from "../../dtos/input.chat.data";
import { RoomOutputData } from "../../dtos/output.chat.data";

export interface IGetRoomsByUserInput {
  getRoomsByUser(user: GetRoomsByUserInputData): Promise<RoomOutputData[]>;
}

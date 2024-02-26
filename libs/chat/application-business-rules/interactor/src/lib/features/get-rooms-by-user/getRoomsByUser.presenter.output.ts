import { RoomOutputData } from "../../dtos/output.chat.data";

export interface IGetRoomsByUserPresenterOutput {
    selectedRoomsByUser(rooms: RoomOutputData[]): RoomOutputData[];
}
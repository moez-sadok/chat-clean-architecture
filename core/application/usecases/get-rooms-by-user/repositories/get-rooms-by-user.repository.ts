/**
 * Summary of a room the user takes part in.
 * Listing the rooms of a user does not need the participants nor the messages:
 * hydrating them would cost one read per participant of every room (ISP).
 */
export interface UserChatRoomDto {
  id: number;
  name: string;
}

export interface IChatRoomsRepository {
  getChatRoomsByUser(userId: number): Promise<UserChatRoomDto[]>;
}

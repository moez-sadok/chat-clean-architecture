// export interface GetRoomsByUserResponseData {
//   roomName: string;
//   roomId: number;
//   participantsNames?: string[];
// }

export interface MessageOutputData {
  authorName: string;
  message: string;
  chatRoomId: number;
  authorId : number;
}

export interface UserOutputData {
  id: number;
  name: string;
  // status?: string;
  // avatar?: string;
}


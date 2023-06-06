
export interface IChatController {
  initUserConnection(userId: number):void;
  getUserRooms(userId: number): void;
  getRoomMessages(roomId: number,roomName: string): void;
  sendMessage(roomId: number, userId: number, message: string): void;
}

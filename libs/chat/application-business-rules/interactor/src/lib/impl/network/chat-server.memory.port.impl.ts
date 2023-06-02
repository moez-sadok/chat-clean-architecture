
import { IChatroom, IMessage,  Message } from "@chat-clean-architecture/chat/entreprise-business-rules/entities";
import { IChatClient } from "../../interfaces/network/chat-client.port";
import { IChatServerPort } from "../../interfaces/network/chat-server.port";

export class ChatServerPortMemoryImpl implements IChatServerPort {

  private connectetdUsers: Record<number, IChatClient> = {};
  private rooms: Record<number, IChatroom> = {};

  getConnectedClients(): Record<number, IChatClient> {
    return this.connectetdUsers;
  }

  connectUser(user: IChatClient): boolean {
    const userId = user.getId();
    if (userId === null || userId === undefined) return false;
    if (!this.connectetdUsers[userId]) {
      this.connectetdUsers[userId] = user;
      return true;
    } else
      return false;
  }

  disconnectUser(user: IChatClient): void {
    const userId = user.getId();
    if (userId && this.connectetdUsers[userId]) delete this.connectetdUsers[userId];
  }

  broadcast(msg: IMessage): void {
    const currRoom = this.rooms[msg.getchatRoom().getId()];
    if (!currRoom) console.log('Room not found: search in database or in service discovery from another chatserver instance')
    const currPart = currRoom.getParticipants()[msg.getParticipant().getUserName()];
    const message: IMessage = new Message(msg.getcontent(), currRoom, currPart);
    currRoom.broadcastMessage(message, currPart);
  }

  joinRoom(client: IChatClient, roomId: number): void {
    client.join(roomId);
  }

  leaveRoom(client: IChatClient, roomId: number): void {
    client.leave(roomId);
  }

  initServer(rooms: IChatroom[]): void {
    const chatRooms: Record<number, IChatroom> = {};
    rooms.map(room => { chatRooms[room.getId()] = room; });
    this.rooms = chatRooms;
  }

}
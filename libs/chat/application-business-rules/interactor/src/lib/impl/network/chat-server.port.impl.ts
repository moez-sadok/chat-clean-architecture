
import { IChatroom, IMessage, Message } from "@chat-clean-architecture/chat/entreprise-business-rules/entities";
import { IChatClient } from "../../interfaces/network/chat-client.port";
import { IChatServerPort } from "../../interfaces/network/chat-server.port";
import { MessageOutputData } from "../../dtos/output.chat.data";

export class ChatServerPortImpl implements IChatServerPort {

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
    } else return false;
  }

  disconnectUser(userId: number): boolean {
    if (userId === null || userId === undefined) return false;
    if (!this.connectetdUsers[userId]) return false;
    delete this.connectetdUsers[userId];
    return true;
  }

  broadcast(msg: MessageOutputData): void {
    const currRoom = this.rooms[msg.chatRoomId];
    if (!currRoom) console.log('Room not found: search in database or in service discovery from another chatserver instance')
    const currPart = currRoom.getParticipants()[msg.authorName];
    const message: IMessage = new Message(msg.message, currRoom, currPart);
    currRoom.broadcastMessage(message, currPart);
  }

  initServer(rooms: IChatroom[]): void {
    const chatRooms: Record<number, IChatroom> = {};
    rooms.map(room => { chatRooms[room.getId()] = room; });
    this.rooms = chatRooms;
  }

}
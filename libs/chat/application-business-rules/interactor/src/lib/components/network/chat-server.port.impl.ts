
import { IChatroom, IMessage, Message } from "@chat-clean-architecture/chat/entreprise-business-rules/entities";
import { MessageOutputData } from "../../dtos/output.chat.data";
import { IChatServerPort } from "./abstraction/chat-server.port";
import { IChatClient } from "./abstraction/chat-client.port";

export class ChatServerPortImpl implements IChatServerPort {

  protected connectetdUsers: Record<number, IChatClient> = {};

  getConnectedClients(): Record<number, IChatClient> {
    return this.connectetdUsers;
  }

  connectUser(client: IChatClient): boolean {
    const userId = client.getId();
    if (userId === null || userId === undefined) return false;
    if (!this.connectetdUsers[userId]) {
      this.connectetdUsers[userId] = client;
      return true;
    } else return false;
  }

  disconnectUser(userId: number): boolean {
    if (userId === null || userId === undefined) return false;
    if (!this.connectetdUsers[userId]) return false;
    delete this.connectetdUsers[userId];
    return true;
  }

  broadcast(msg: MessageOutputData, currRoom: IChatroom): void {
    if (!currRoom) console.log('Room not found: search in database or in service discovery from another chatserver instance')
    const currPart = currRoom.getParticipants()[msg.authorName];
    const message: IMessage = new Message(msg.message, currRoom, currPart);
    currRoom.broadcastMessage(message, currPart);
  }

}
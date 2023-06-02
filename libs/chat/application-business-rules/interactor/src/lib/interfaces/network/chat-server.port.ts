/******** Abstraction of mediator pattern */
import { IChatroom, IMessage } from "@chat-clean-architecture/chat/entreprise-business-rules/entities";
import { IChatClient } from "./chat-client.port";

// Mediator
export interface IChatServerPort {
  connectUser(user: IChatClient): boolean;
  disconnectUser(user: IChatClient): void;
  joinRoom(user: IChatClient,roomId: number):void;  
  leaveRoom(client: IChatClient , room: number):void;
  broadcast(message: IMessage): void;

  initServer(rooms: IChatroom[]):void;
  getConnectedClients():Record<number, IChatClient>;
}


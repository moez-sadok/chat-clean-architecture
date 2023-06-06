/******** Abstraction of mediator pattern */
import { IChatroom } from "@chat-clean-architecture/chat/entreprise-business-rules/entities";
import { IChatClient } from "./chat-client.port";
import { MessageOutputData } from "../../dtos/output.chat.data";

// Mediator
export interface IChatServerPort {
  connectUser(user: IChatClient): boolean;
  disconnectUser(userId: number): boolean;
  broadcast(message: MessageOutputData): void;
  initServer(rooms: IChatroom[]):void;
  getConnectedClients():Record<number, IChatClient>;
}


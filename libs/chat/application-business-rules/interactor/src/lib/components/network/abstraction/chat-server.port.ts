/******** Abstraction of mediator pattern */
import { IChatClient } from "./chat-client.port";
import { MessageOutputData } from "../../../dtos/output.chat.data";
import { IChatroom } from "@chat-clean-architecture/chat/entreprise-business-rules/entities";

// Mediator
export interface IChatServerPort {
  connectUser(user: IChatClient): boolean;
  disconnectUser(userId: number): boolean;
  broadcast(message: MessageOutputData, room : IChatroom): void;
  getConnectedClients():Record<number, IChatClient>;
}


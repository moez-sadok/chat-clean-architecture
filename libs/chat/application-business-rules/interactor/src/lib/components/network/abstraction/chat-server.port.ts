/******** Abstraction of mediator pattern */
import { IChatClient } from "./chat-client.port";
import { MessageOutputData } from "../../../dtos/output.chat.data";
import { IChatroom } from "@chat-clean-architecture/chat/entreprise-business-rules/entities";
import { ISendMessagePresenterOutput } from "../../../features/send-message/sendMessage.presenter.output";

// Mediator
export interface IChatServerPort {
  connectUser(user: IChatClient): boolean;
  connectUserByID(useID: number,presenter:ISendMessagePresenterOutput): boolean;
  disconnectUser(userId: number): boolean;
  broadcast(message: MessageOutputData): void;
  initServer(rooms: IChatroom[]):void;
  getConnectedClients():Record<number, IChatClient>;
}


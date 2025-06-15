import { IChatClient } from "../../../domain/chat-client";

export interface IConnectClientInput {
  connectClient(client: IChatClient):Promise<boolean>;
}

import { IChatClient } from "../../../domain/ports/chat-client";

export interface IConnectClientInput {
  connectClient(client: IChatClient):Promise<boolean>;
}

import { IChatClient } from "../../components/network/abstraction/chat-client.port";

export interface IConnectClientInput {
  connectClient(client: IChatClient):Promise<boolean>;
}

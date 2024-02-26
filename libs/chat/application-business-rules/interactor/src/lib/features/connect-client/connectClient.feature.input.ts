import { IChatClient } from "../../components/network/chat-client.port";

export interface IConnectClientInput {
  connectClient(client: IChatClient):Promise<boolean>;
}

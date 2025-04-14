import { IChatClient } from "../../../gateways/notifiyer/chat-client.port";

export interface IConnectClientInput {
  connectClient(client: IChatClient):Promise<boolean>;
}

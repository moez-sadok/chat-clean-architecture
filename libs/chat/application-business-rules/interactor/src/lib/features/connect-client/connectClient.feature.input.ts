import { IChatClient } from "@chat-clean-architecture/chat/entreprise-business-rules/notifiyer";

export interface IConnectClientInput {
  connectClient(client: IChatClient):Promise<boolean>;
}

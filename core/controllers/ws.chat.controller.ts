import { IChatClient } from "../domain/ports/chat-client";


export interface IChatWsController {
  //serve(): Promise<void>; /:or init
  connectClient(client: IChatClient | number | any, prsenter?:any):Promise<boolean>;
  disconnectClient(userId: number):Promise<boolean>;
}

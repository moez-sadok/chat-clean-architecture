// // import { INotifilyer } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
// // import { MessageOutputData } from '../../dtos/output.chat.data';
// // import { IChatClient } from './abstraction/chat-client.port';

// // import { IChatServerPort } from './abstraction/chat-server.port';
// export class NotifiyerNetworkImpl { //implements INotifilyer 

//     // //constructor(private chatServer: IChatServerPort){};

//     // //notifiy(msg: string, roomId: number,receiverId:number, receiverName : string): void {
//     // //    const connectedReceiver = this.chatServer.getConnectedClients()[receiverId];
//     // //    const messageOutput : MessageOutputData = { chatRoomId : roomId, message : msg, authorName :receiverName}
//     // //    if(connectedReceiver) connectedReceiver.receive(messageOutput);
//     // //    else console.log('Participant user is not connected, send a push notif',receiverId);
//     // //}

//     // constructor(private connectedReceiver: IChatClient){}

//     // notifiy(msg: string, roomId: number,receiverId:number, receiverName : string): void {
//     //     //const connectedReceiver = this.chatServer.getConnectedClients()[receiverId];
//     //     const messageOutput : MessageOutputData = { chatRoomId : roomId, message : msg, authorName :receiverName}
//     //     if(this.connectedReceiver) this.connectedReceiver.receive(messageOutput);
//     //     else console.log('Participant user is not connected, send a push notif',receiverId);
//     //  }

// }
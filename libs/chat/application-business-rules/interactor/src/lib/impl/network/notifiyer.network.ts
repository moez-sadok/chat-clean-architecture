import { INotifilyer } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
import { IChatServerPort } from '../../interfaces/network/chat-server.port';
import { MessageOutputData } from '../../dtos/output.chat.data';

export class NotifiyerNetworkImpl implements INotifilyer {

    constructor(private chatServer: IChatServerPort){}

    notifiy(msg: string, roomId: number,receiverId:number, receiverName : string): void {
       const connectedReceiver = this.chatServer.getConnectedClients()[receiverId];
       const messageOutput : MessageOutputData = { chatRoomId : roomId, message : msg, participantName :receiverName}
       if(connectedReceiver) connectedReceiver.receive(messageOutput);
       else console.log('Participant user is not connected, send a push notif');
    }

}
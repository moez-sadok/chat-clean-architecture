import { Socket } from 'socket.io-client';
import { IChatAppFacadePresenterOutput, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { ChatClientPortImpl } from '../chat-client.port.impl';
// Adapter design pattern (Class)  (see 2e solution below - Object Adapter)
// https://refactoring.guru/design-patterns/adapter/typescript/example
export class ChatClientSocketkAdapter extends ChatClientPortImpl {
    // socket as the adaptee
    constructor(private socket: Socket, protected presentator: IChatAppFacadePresenterOutput) {
        //@ts-ignore
        super(socket.auth.userId, socket.auth.userName, presentator);
        this.onReceivedMessage();
    }

    onReceivedMessage() {
        this.socket.on('msgToClient', (message: MessageOutputData) => {
            this.receive(message.message, message.chatRoomId, this.userId, message.authorName);
        });
    }

}












// 2 solution : Adapter pattern (Object)  / proxy ?
// export class ChatClientSocketkAdapterObj implements IChatClient {

//     protected userName: string;
//     // socket is the adaptee
//     constructor(private socket: Socket, protected presentator: IChatAppFacadePresenterOutput) {
//         //@ts-ignore
//         this.userName = this.socket.auth.userName;
//         this.onReceivedMessage();
//     }

//     private onReceivedMessage() {
//         this.socket.on('msgToClient', (message) => {
//             this.receive(message)
//         });
//     }

//     receive(message: MessageOutputData): void {
//         if (this.presentator) this.presentator.receiveNewMessage(message);
//     }

//     getId(): number {
//         //@ts-ignore
//         return +this.socket.auth.userId;
//     }

// }
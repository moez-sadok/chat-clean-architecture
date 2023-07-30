import { Socket } from 'socket.io-client';
import { ChatClientPortImpl, IChatPresenterOutputBoundary,IChatClient, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
// Adapter design pattern (Class) short way 
export class ChatClientsocketkAdapter extends ChatClientPortImpl {
    // socket is the adaptee
    constructor(private socket: Socket, protected presentator: IChatPresenterOutputBoundary) {
        //@ts-ignore
        super(socket.auth.userId, socket.auth.userName, presentator);
        this.onReceivedMessage();
    }

    onReceivedMessage() {
        this.socket.on('msgToClient', (message) => {
            this.receive(message)
        });
    }

}

// // NOT USED : Adapter pattern (Object)  
// export class ChatClientsocketkAdapterObj implements IChatClient {

//     // socket is the adaptee
//     constructor(private socket: Socket, protected presentator: IChatPresenterOutputBoundary) {
//         //@ts-ignore
//         super(socket.auth.userId, socket.auth.userName, presentator);
//         this.onReceivedMessage();
//     }

//     private onReceivedMessage() {
//         this.socket.on('msgToClient', (message) => {
//             this.receive(message)
//         });
//     }

//     setName(name: string): void {
//         this.setName(name);
//     }
//     getId(): number {
//         return this.getId();
//     }
//     getName(): string {
//       return this.getName();

//     }
//     receive(message: MessageOutputData): void {
//         return this.receive(message);
//     }

// }
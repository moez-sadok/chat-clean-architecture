import { Socket } from 'socket.io-client';
import { IChatAppFacadePresenterOutput, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatClient } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
// Adapter design pattern (Object)  (see 2e solution - class )
// https://refactoring.guru/design-patterns/adapter/typescript/example
export class ChatClientSocketkAdapter implements IChatClient {
    // socket as the adaptee
    constructor(private socket: Socket, protected presenter: IChatAppFacadePresenterOutput) {
        this.onReceivedMessage();
    }

    private onReceivedMessage() {
        this.socket.on('msgToClient', (message: MessageOutputData) => {
            this.receive(message.message, message.chatRoomId, this.getId(), message.authorName);
        });
    }

    receive(msg: string, roomId: number, receiverId: number, receiverName: string): void {
        const messageOutput: MessageOutputData = { chatRoomId: roomId, message: msg, authorName: receiverName }
        if (this.presenter) this.presenter.receiveNewMessage(messageOutput);
    }

    getId(): number {
        //@ts-ignore
        return this.socket.auth['userId']
    }

}

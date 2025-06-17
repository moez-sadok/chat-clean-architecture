// https://refactoring.guru/design-patterns/adapter/typescript/example
import { Socket } from 'socket.io-client';
import { IChatClient } from '../../../gateways/index';
import { ISendMessagePresenterOutput, MessageOutputData } from '../../../application/usecases';

export class ChatClientSocketkAdapter implements IChatClient {
    // socket as the adaptee
    constructor(private socket: Socket, protected presenter: ISendMessagePresenterOutput) {
        this.onReceivedMessage();
    }

    private onReceivedMessage() {
        this.socket.on('msgToClient', (message: MessageOutputData) => {
            this.receive(message.message, message.chatRoomId, this.getId(), message.authorName);
        });
    }

    receive(msg: string, roomId: number, receiverId: number, receiverName: string): void {
        const messageOutput: MessageOutputData = { chatRoomId: roomId, message: msg, authorName: receiverName, authorId: receiverId }
        if (this.presenter) this.presenter.receiveNewMessage(messageOutput);
    }

    getId(): number {
        //@ts-ignore
        return this.socket.auth['userId']
    }

}

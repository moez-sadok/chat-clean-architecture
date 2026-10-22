// https://refactoring.guru/design-patterns/adapter/typescript/example
import { Socket } from 'socket.io-client';
import { MessageOutputData ,IGetMessagesByRoomPresenterOutput} from '@cca/core-features';
import { IChatClient } from '@cca/core-domain';

export class ChatClientSocketAdapter implements IChatClient {
    // socket as the adaptee
    constructor(private socket: Socket, protected presenter: IGetMessagesByRoomPresenterOutput) {
        this.onReceivedMessage();
    }

    private onReceivedMessage() {
        this.socket.on('msgToClient', (message: MessageOutputData) => {
            this.receive(message.message, message.chatRoomId, this.getId(), message.authorName);
        });
    }

    receive(msg: string, roomId: number, receiverId: number, receiverName: string): void {
        const messageOutput: MessageOutputData = { chatRoomId: roomId, message: msg, authorName: receiverName, authorId: receiverId }
        if (this.presenter) this.presenter.presentNewMessage(messageOutput);
    }

    getId(): number {
        // set by ChatControllerWsClientAdapterImpl when it opens the socket
        return (this.socket.auth as { userId: number }).userId;
    }

}

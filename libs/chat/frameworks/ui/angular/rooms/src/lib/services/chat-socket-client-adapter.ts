import { Socket } from 'socket.io-client';
import { ChatClientPortImpl, IChatPresenterOutputBoundary } from '@chat-clean-architecture/chat/application-business-rules/interactor';

export class ChatClientsocketkAdapter extends ChatClientPortImpl {

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
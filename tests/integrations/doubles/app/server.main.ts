
import { SendMessagePresenterApi } from "../../../../core/presenter";
import { IChatClient } from "../../../../core/gateways";
import { ChatroomDto } from "../../../../core/dtos/models/chatroom.dto";
//doubles
import { AppBackendDouble } from "./app-backend-double";
import { ChatClientPortImpl } from "../ws/chat-client.port.impl";

export class ServerMainDouble {

    backend: AppBackendDouble = new AppBackendDouble();

    async makeClient(name: string): Promise<IChatClient> {
        const chatPresenter = new SendMessagePresenterApi();
        const addedUser = await this.backend.chatdbMapper.addUser({ id: -1, name: name });

        const clientWs: IChatClient = new ChatClientPortImpl(addedUser.id, addedUser.name, chatPresenter);
        await this.backend.chatServer.connectUser(clientWs);

        return new Promise((resolve) => {
            resolve(clientWs);
        });
    }

    async addClientToRoom(userId: number, roomId: number) {
        const currUser = await this.backend.chatdbMapper.getUserById(userId);
        if (!currUser) throw new Error('addClientToRoom User not added');
        this.backend.chatdbMapper.addParticipant({
            user: { name: currUser.name, id: currUser.id },
            chatroom: { id: roomId, name: '', participants: {} }
        })
    }

    addNewRoom(name: string): Promise<ChatroomDto> {
        return this.backend.chatdbMapper.addChatRoom({ name: name, id: -1, participants: [] })
    }

}


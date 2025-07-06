import { ChatroomDto } from "../../../../core/dtos/models/chatroom.dto";
//doubles
import { AppBackendDouble } from "./app-backend-double";
import { ChatClientMemoryImpl } from "../ws/chat-client.port.impl";
import { IChatClient } from "../../../../core/domain";

export class ServerMainDouble {

    backend: AppBackendDouble = new AppBackendDouble();

    async makeClient(name: string): Promise<IChatClient> {
        const addedUser = await this.backend.chatdbMapper.addUser({ id: -1, name: name });

        const clientWs: IChatClient = new ChatClientMemoryImpl(addedUser.id, addedUser.name, this.backend.getMessagesByRoomPresenterApi);
        await this.backend.chatServer.connectUser(clientWs);

        return new Promise((resolve) => { resolve(clientWs);});
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


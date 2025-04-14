
import { IChatHttpController } from "../../../../core/controllers";
import { ChatUiPresenterImpl,  IChatView } from "../../../../core/presenter";
import { UserWebViewClientImpl } from "../../../../core/views";
import { IChatClient } from "../../../../core/gateways";
import { ChatroomDto } from "../../../../core/dtos/models/chatroom.dto";
//doubles
import { ChatControllerHttpClientMemory } from "../http/chat-controller-client.memory";
import { AppBackendDouble } from "./app-backend-double";
import { ChatClientPortImpl } from "../ws/chat-client.port.impl";

export interface ClientViewController {
    view: IChatView,
    controller: IChatHttpController,
    id: number
}

export class MainDouble {

    backend: AppBackendDouble = new AppBackendDouble();

    async makeClient(name: string): Promise<ClientViewController> {
        const chatView = new UserWebViewClientImpl();
        const chatPresenter = new ChatUiPresenterImpl(chatView);
        const clientChatController = new ChatControllerHttpClientMemory(this.backend.apiChatController, chatPresenter);

        const addedUser = await this.backend.chatdbMapper.addUser({ id: -1, name: name });
        const currUser = await clientChatController.getUserById(addedUser.id);
        if (!currUser) throw new Error('Fail in adding user to repository');

        const clientWs: IChatClient = new ChatClientPortImpl(addedUser.id, addedUser.name, chatPresenter);
        await this.backend.chatServer.connectUser(clientWs);

        return new Promise((resolve) => {
            resolve({ view: chatView, controller: clientChatController, id: addedUser.id });
        });
    }

    async addClientToRoom(userId: number, roomId: number) {
        const currRoom = await this.backend.chatdbMapper.getChatRoomsById(roomId);
        if (!currRoom) throw new Error('addClientToRoom room not found');
        const currUser = await this.backend.chatdbMapper.getUserById(userId);
        if (!currUser) throw new Error('addClientToRoom User not added');
        this.backend.chatdbMapper.addParticipant({ user: { name: currUser.name, id: currUser.id }, chatroom: currRoom })
        //await chatController.getUserRooms(addedUser.id);
    }

    addNewRoom(name: string): Promise<ChatroomDto> {
        return this.backend.chatdbMapper.addChatRoom({ name: name, id: -1, participants: [] })
    }

}


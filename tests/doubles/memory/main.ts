
import { ChatControllerMemoryImpl, IChatController } from "../../../libs/chat/adapters/controllers/src";
import { DataBaseMapper, IChatDatabase } from "../../../libs/chat/adapters/gateways/src";
import { ChatServerMemoryImpl } from "../../../libs/chat/adapters/network/src";
import { ChatUiPresenterImpl, IChatView } from "../../../libs/chat/adapters/presenters/src";
import { UserWebViewClientImpl } from "../../../libs/chat/adapters/views/src/lib/ui/user.chat.view.ui";
import { ChatAppFacadeImpl, ChatroomDto, IChatRepository, IChatServerPort, UserOutputData } from "../../../libs/chat/application-business-rules/interactor/src";
import { DataBaseMemoryImpl } from "../../../libs/chat/frameworks/db/in-memory-db/src";

export interface ClientViewController {
    view: IChatView,
    controller: IChatController,
    id: number
}

export class MainDouble {

    dataBase!: IChatDatabase;
    chatdbMapper!: IChatRepository;
    chatServer!: IChatServerPort;

    constructor() {
        // initServer
        this.dataBase = new DataBaseMemoryImpl();
        this.chatdbMapper = new DataBaseMapper(this.dataBase);
        this.chatServer = new ChatServerMemoryImpl();
    }

    async makeClient(name: string): Promise<ClientViewController> {
        const chatView = new UserWebViewClientImpl();
        const chatPresenter = new ChatUiPresenterImpl(chatView);
        //perf issue to check
        const chatApp = new ChatAppFacadeImpl(this.chatdbMapper, chatPresenter, this.chatServer);
        const chatController = new ChatControllerMemoryImpl(chatApp, chatPresenter);

        const addedUser = await this.chatdbMapper.addUser({ id: -1, name: name });
        const currUser = await chatController.getUserById(addedUser.id);
        if (!currUser) throw new Error('Fail in adding user to repository');

        await chatController.connectClient(addedUser.id);
        
        return new Promise((resolve) => {
            resolve({ view: chatView, controller: chatController, id: addedUser.id });
        });
    }

    async addClientToRoom( userId: number,roomId: number) {
        const currRoom = await this.chatdbMapper.getChatRoomsById(roomId);
        if (!currRoom) throw new Error('addClientToRoom room not found');
        const currUser = await this.chatdbMapper.getUserById(userId);
        if (!currUser) throw new Error('addClientToRoom User not added');
        this.chatdbMapper.addParticipant({ user: { name: currUser.name, id: currUser.id }, chatroom: currRoom })
        //await chatController.getUserRooms(addedUser.id);
    }

    addNewRoom(name: string): Promise<ChatroomDto> {
        return this.chatdbMapper.addChatRoom({ name: name, id: -1, participants: [] })
    }
}


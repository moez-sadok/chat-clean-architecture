
import { IChatHttpController, IHttpController } from "../../../../core/controllers";
import { ChatUiPresenterImpl,  IChatView } from "../../../../core/presenter";
import { UserWebViewClientImpl } from "../../../../core/views";
import { IChatClient } from "../../../../core/gateways";
import { ChatroomDto } from "../../../../core/dtos/models/chatroom.dto";
//doubles
import { ChatControllerHttpClientMemory, GetRoomMessagesHttpControllerClientMemory, GetUserRoomsHttpControllerClientMemory } from "../http/chat-controller-client.memory";
import { AppBackendDouble } from "./app-backend-double";
import { ChatClientMemoryImpl } from "../ws/chat-client.port.impl";
import { GetRoomsByUserClientView, GetRoomsByUserPresenterUi } from "../../../../core/application/usecases/get-rooms-by-user";
import { IGetRoomsByUserView } from "../../../../core/application/usecases/get-rooms-by-user/presenter/getRoomsByUser.view";
import { GetMessagesByRoomClientView, GetMessagesByRoomPresenterUi, IGetMessagesByRoomView } from "../../../../core/application/usecases";

export interface ClientViewController {
    id: number
    //Refactoring ...
    view: IChatView,
    controller: IChatHttpController,
    //
    getRoomsView: IGetRoomsByUserView,
    getRoomsController: IHttpController,
    //
    getMessagesView: IGetMessagesByRoomView,
    getMessagesController : IHttpController,
}

export class MainDouble {

    backend: AppBackendDouble = new AppBackendDouble();

    async makeClient(name: string): Promise<ClientViewController> {

        const getRoomsByUserView = new GetRoomsByUserClientView();
        const getRoomsByUserPresenter = new GetRoomsByUserPresenterUi(getRoomsByUserView);
        const clientGetRoomsController = new GetUserRoomsHttpControllerClientMemory( getRoomsByUserPresenter,this.backend.getUserRoomsHttpControllerApi);
        
        const getMessagesByRoomView = new GetMessagesByRoomClientView();
        const getMessagesByRoomPresenter = new GetMessagesByRoomPresenterUi(getMessagesByRoomView);
        const clientGetMessagesController = new GetRoomMessagesHttpControllerClientMemory( getMessagesByRoomPresenter,this.backend.getMessagesRoomHttpControllerApi);

        const chatView = new UserWebViewClientImpl();
        const chatPresenter = new ChatUiPresenterImpl(chatView);
        const clientChatController = new ChatControllerHttpClientMemory(this.backend.apiChatController, chatPresenter);
       
        const addedUser = await this.backend.chatdbMapper.addUser({ id: -1, name: name });
        const currUser = await clientChatController.getUserById(addedUser.id);
        if (!currUser) throw new Error('Fail in adding user to repository');

        const clientWs: IChatClient = new ChatClientMemoryImpl(addedUser.id, addedUser.name, chatPresenter);
        await this.backend.chatServer.connectUser(clientWs);

        return new Promise((resolve) => {
            resolve({ 
                id: addedUser.id,
                view: chatView,
                controller: clientChatController, 
                //
                getRoomsView: getRoomsByUserView,
                getRoomsController: clientGetRoomsController,
                //
                getMessagesView: getMessagesByRoomView,
                getMessagesController: clientGetMessagesController
            });
        });
    }

    async addClientToRoom(userId: number, roomId: number) {
        const currUser = await this.backend.chatdbMapper.getUserById(userId);
        if (!currUser) throw new Error('addClientToRoom User not added');
        this.backend.chatdbMapper.addParticipant({ 
            user: { name: currUser.name, id: currUser.id }, 
            chatroom: {id: roomId, name:'',participants: {}} 
        })
    }

    addNewRoom(name: string): Promise<ChatroomDto> {
        return this.backend.chatdbMapper.addChatRoom({ name: name, id: -1, participants: [] })
    }

}


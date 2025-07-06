
import { IHttpController } from "../../../../core/controllers";
import { ChatroomDto } from "../../../../core/dtos/models/chatroom.dto";
//doubles
import { GetRoomMessagesHttpControllerClientMemory, GetUserByIdHttpControllerClientMemory, GetUserRoomsHttpControllerClientMemory, SendMessageHttpControllerClientMemory } from "../http/chat-controller-client.memory";
import { AppBackendDouble } from "./app-backend-double";
import { ChatClientMemoryImpl } from "../ws/chat-client.port.impl";
import { GetRoomsByUserClientView, GetRoomsByUserPresenterUi } from "../../../../core/application/usecases/get-rooms-by-user";
import { IGetRoomsByUserView } from "../../../../core/application/usecases/get-rooms-by-user/presenter/getRoomsByUser.view";
import { GetMessagesByRoomClientView, GetMessagesByRoomPresenterUi, GetUserByIdClientView, IGetMessagesByRoomView, IGetUserByIdView, ISendMessageView, SendMessagePresenterUi, SendMessageWebView, UserByIdPresenterUi } from "../../../../core/application";
import { IChatClient } from "../../../../core/domain";

export interface ClientViewController {
    id: number
    //
    getRoomsView: IGetRoomsByUserView,
    getRoomsController: IHttpController,
    //
    getMessagesView: IGetMessagesByRoomView,
    getMessagesController : IHttpController,
    //
    getUserByIdView: IGetUserByIdView,
    getUserByIdController : IHttpController,
    //
    sendMessageView: ISendMessageView,
    sendMessageController : IHttpController
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

        const getUserByIdView = new GetUserByIdClientView();
        const getUserByIdPresenter = new UserByIdPresenterUi(getUserByIdView);
        const clientGetUserByIdController = new GetUserByIdHttpControllerClientMemory( getUserByIdPresenter,this.backend.getUserRoomsHttpControllerApi);

        const sendMessageView = new SendMessageWebView();
        const sendMessagePresenter = new SendMessagePresenterUi(sendMessageView);
        const clientsendMessageController = new SendMessageHttpControllerClientMemory( sendMessagePresenter,this.backend.sendMessageHttpControllerApi);

        const addedUser = await this.backend.chatdbMapper.addUser({ id: -1, name: name });
        const currUser = await clientGetUserByIdController.handle({ userId :  addedUser.id});
        if (!currUser) throw new Error('Fail in adding user to repository');
        
        const clientWs: IChatClient = new ChatClientMemoryImpl(addedUser.id, addedUser.name, getMessagesByRoomPresenter);
        await this.backend.chatServer.connectUser(clientWs);

        return new Promise((resolve) => {
            resolve({ 
                id: addedUser.id,
                //
                getRoomsView: getRoomsByUserView,
                getRoomsController: clientGetRoomsController,
                //
                getMessagesView: getMessagesByRoomView,
                getMessagesController: clientGetMessagesController,
                //
                getUserByIdView: getUserByIdView,
                getUserByIdController : clientGetUserByIdController,
                //
                sendMessageView: sendMessageView,
                sendMessageController : clientsendMessageController
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


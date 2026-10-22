
import { ChatroomDto } from "../../../../core/dtos/models/chatroom.dto";
//doubles
import { SpaHttpClientMemory } from "../http/chat-controller-client.memory";
import { GetMessagesOutputData, GetRoomMessagesInputData, GetRoomsByUserRequestData, GetRoomsByUserResponseData, GetUserByIdInputData, SendMessageInputData, SendMessageOutputData, UserOutputData } from "../../../../core/application";
import { GetRoomMessagesAPIHttpControllerClientAdapter, GetUserByIdAPIHttpControllerClientAdapter, GetUserRoomsAPIHttpControllerClientAdapter, SendMessageAPIHttpControllerClientAdapter } from "../../../../core/application";
import { AppBackendDouble } from "./app-backend-double";
import { IChatDatabase } from "../../../../core/gateways/persistence";
import { ChatClientMemoryImpl } from "../ws/chat-client.port.impl";
import { GetRoomsByUserClientView, GetRoomsByUserPresenterUi } from "../../../../core/application/usecases/get-rooms-by-user";
import { IGetRoomsByUserView } from "../../../../core/application/usecases/get-rooms-by-user/presenter/get-rooms-by-user.view";
import { GetMessagesByRoomClientView, GetMessagesByRoomPresenterUi, GetUserByIdClientView, IGetMessagesByRoomView, IGetUserByIdView, ISendMessageView, SendMessagePresenterUi, SendMessageWebView, UserByIdPresenterUi } from "../../../../core/application";
import { IChatClient } from "../../../../core/domain";
import { UserDto } from "../../../../core/dtos/models/user.dto";

export interface ClientViewController {
    id: number
    ws: IChatClient,
    //
    getRoomsView: IGetRoomsByUserView,
    getRoomsController: SpaHttpClientMemory<GetRoomsByUserRequestData, GetRoomsByUserResponseData[]>,
    //
    getMessagesView: IGetMessagesByRoomView,
    getMessagesController: SpaHttpClientMemory<GetRoomMessagesInputData, GetMessagesOutputData>,
    //
    getUserByIdView: IGetUserByIdView,
    getUserByIdController: SpaHttpClientMemory<GetUserByIdInputData, UserOutputData | null>,
    //
    sendMessageView: ISendMessageView,
    sendMessageController: SpaHttpClientMemory<SendMessageInputData, SendMessageOutputData>
}

export class MainDouble {

    backend: AppBackendDouble;

    constructor(dataBase?: IChatDatabase) {
        this.backend = new AppBackendDouble(dataBase);
    }

    async makeClient(name: string): Promise<ClientViewController> {
        const addedUser = await this.backend.chatdbMapper.addUser({ id: -1, name: name });
        return this.makeClientFor(addedUser);
    }

    // a client for a user already in the repository, connected to the chat server unless told otherwise
    async makeClientFor(addedUser: UserDto, connect = true): Promise<ClientViewController> {

        const getRoomsByUserView = new GetRoomsByUserClientView();
        const getRoomsByUserPresenter = new GetRoomsByUserPresenterUi(getRoomsByUserView);
        const clientGetRoomsController = new SpaHttpClientMemory(this.backend.getUserRoomsHttpControllerApi, new GetUserRoomsAPIHttpControllerClientAdapter(getRoomsByUserPresenter));
        
        const getMessagesByRoomView = new GetMessagesByRoomClientView();
        const getMessagesByRoomPresenter = new GetMessagesByRoomPresenterUi(getMessagesByRoomView);
        const clientGetMessagesController = new SpaHttpClientMemory(this.backend.getMessagesRoomHttpControllerApi, new GetRoomMessagesAPIHttpControllerClientAdapter(getMessagesByRoomPresenter));

        const getUserByIdView = new GetUserByIdClientView();
        const getUserByIdPresenter = new UserByIdPresenterUi(getUserByIdView);
        const clientGetUserByIdController = new SpaHttpClientMemory(this.backend.getUserByIdHttpControllerApi, new GetUserByIdAPIHttpControllerClientAdapter(getUserByIdPresenter));

        const sendMessageView = new SendMessageWebView();
        const sendMessagePresenter = new SendMessagePresenterUi(sendMessageView);
        const clientsendMessageController = new SpaHttpClientMemory(this.backend.sendMessageHttpControllerApi, new SendMessageAPIHttpControllerClientAdapter(sendMessagePresenter));

        const currUser = await clientGetUserByIdController.handle({ userId :  addedUser.id});
        if (!currUser) throw new Error('Fail in adding user to repository');
        
        const clientWs: IChatClient = new ChatClientMemoryImpl(addedUser.id, addedUser.name, getMessagesByRoomPresenter);
        if (connect) await this.backend.chatServer.connectUser(clientWs);

        return new Promise((resolve) => {
            resolve({ 
                id: addedUser.id,
                ws: clientWs,
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
        await this.backend.chatdbMapper.addParticipant({ 
            user: { name: currUser.name, id: currUser.id }, 
            chatroom: {id: roomId, name:'',participants: {}} 
        })
    }

    addNewRoom(name: string): Promise<ChatroomDto> {
        return this.backend.chatdbMapper.addChatRoom({ name: name, id: -1, participants: [] })
    }

}


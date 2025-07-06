
import { IHttpController } from "../../../../core/controllers";
import { DataBaseMapper, IChatDatabase } from "../../../../core/gateways/persistence";
import { ChatServerMemoryImpl } from "../ws/chat-server.memory.impl";
import { DataBaseMemoryImpl, DataBaseMemoryPerfImpl } from "../../../../libs/chat/frameworks/db/in-memory-db/src";
import { GetMessagesRoomHttpControllerApiMemory, GetUserByIdHttpControllerApiMemory, GetUserRoomsHttpControllerApiMemory, SendMessageHttpControllerApiMemory } from "../http/chat-controller.api-memory";
import { GetRoomsByUserFeature, GetUserByIdFeature, GetMessagesByRoomFeature, SendMessageFeature, IGetRoomsByUserRequester, IGetUserByIdInput, IGetMessagesByRoomInput, ISendMessageInput, SendMessagePerfFeature, GetRoomsByUserPresenterAPI, GetMessagesByRoomPresenterApi, GetUserByIdPresenterAPI, SendMessagePresenterApi, IChatServerPort, IChatRepository } from "../../../../core/application";

export class AppBackendDouble {

    dataBase!: IChatDatabase;
    chatdbMapper!: IChatRepository;
    chatServer!: IChatServerPort;

    //init api presenters
    getUserByIdPresenterAPI = new GetUserByIdPresenterAPI();
    getRoomsByUserPresenterAPI = new GetRoomsByUserPresenterAPI();
    getMessagesByRoomPresenterApi =new GetMessagesByRoomPresenterApi();
    sendMessagePresenterApi = new SendMessagePresenterApi();

    // api controllers
    getUserRoomsHttpControllerApi!: IHttpController;
    getMessagesRoomHttpControllerApi!: IHttpController;
    getUserByIdHttpControllerApi !: IHttpController;
    sendMessageHttpControllerApi !: IHttpController;

    //features
    getRoomsByUserFeature: IGetRoomsByUserRequester;
    getUserByIdFeature: IGetUserByIdInput;
    getMessagesByRoomFeature: IGetMessagesByRoomInput;
    sendMessageFeature: ISendMessageInput;

    constructor() {
        // init db and ws server
        // this.dataBase = new DataBaseMemoryImpl();
        this.dataBase = new DataBaseMemoryPerfImpl();
        this.chatdbMapper = new DataBaseMapper(this.dataBase);
        this.chatServer = new ChatServerMemoryImpl();

        // init features
        this.getRoomsByUserFeature = new GetRoomsByUserFeature(this.chatdbMapper);
        this.getUserByIdFeature = new GetUserByIdFeature(this.chatdbMapper, this.getUserByIdPresenterAPI);
        this.getMessagesByRoomFeature = new GetMessagesByRoomFeature(this.chatdbMapper,this.getMessagesByRoomPresenterApi);
        // this.sendMessageFeature = new SendMessageFeature(this.chatdbMapper, this.sendMessagePresenterApi, this.chatServer);
        this.sendMessageFeature = new SendMessagePerfFeature(this.chatdbMapper, this.sendMessagePresenterApi, this.chatServer);

        // init api controllers by feature
        this.getUserRoomsHttpControllerApi = new GetUserRoomsHttpControllerApiMemory(this.getRoomsByUserPresenterAPI, this.getRoomsByUserFeature);
        this.getMessagesRoomHttpControllerApi = new GetMessagesRoomHttpControllerApiMemory(this.getMessagesByRoomPresenterApi, this.getMessagesByRoomFeature);
        this.getUserByIdHttpControllerApi = new GetUserByIdHttpControllerApiMemory(this.getUserByIdPresenterAPI, this.getUserByIdFeature);
        this.sendMessageHttpControllerApi = new SendMessageHttpControllerApiMemory(this.sendMessagePresenterApi, this.sendMessageFeature);
    }

}



import { IHttpController } from "../../../../core/controllers";
import { DataBaseMapper, IChatDatabase } from "../../../../core/gateways/persistence";
import { ChatServerMemoryImpl } from "../ws/chat-server.memory.impl";
import { DataBaseMemoryPerfImpl } from "../../../../libs/chat/frameworks/db/in-memory-db/src";
import { GetRoomsByUserUseCase, GetUserByIdUseCase, GetMessagesByRoomUseCase, IGetRoomsByUserRequester, IGetUserByIdInput, IGetMessagesByRoomInput, ISendMessageInput, SendMessageUseCase, GetRoomsByUserPresenterAPI, GetMessagesByRoomPresenterApi, GetUserByIdPresenterAPI, SendMessagePresenterApi, IChatServerPort, IChatRepository, GetUserRoomsApiHttpControllerAdapter, GetRoomMessagesApiHttpControllerAdapter, GetUserByIdApiHttpControllerAdapter, SendMessageApiHttpControllerAdapter } from "../../../../core/application";

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

    //the database is injectable: the same wiring runs on the in-memory double
    //or on a real adapter (mongo) without touching the use cases.
    constructor(dataBase: IChatDatabase = new DataBaseMemoryPerfImpl()) {
        // init db and ws server
        this.dataBase = dataBase;
        this.chatdbMapper = new DataBaseMapper(this.dataBase);
        this.chatServer = new ChatServerMemoryImpl();

        // init features
        this.getRoomsByUserFeature = new GetRoomsByUserUseCase(this.chatdbMapper, this.getRoomsByUserPresenterAPI);
        this.getUserByIdFeature = new GetUserByIdUseCase(this.chatdbMapper, this.getUserByIdPresenterAPI);
        this.getMessagesByRoomFeature = new GetMessagesByRoomUseCase(this.chatdbMapper, this.getMessagesByRoomPresenterApi);
        this.sendMessageFeature = new SendMessageUseCase(this.chatdbMapper, this.sendMessagePresenterApi, this.chatServer);

        // the production API controller adapters: only the HTTP transport is left out
        this.getUserRoomsHttpControllerApi = new GetUserRoomsApiHttpControllerAdapter(this.getRoomsByUserFeature);
        this.getMessagesRoomHttpControllerApi = new GetRoomMessagesApiHttpControllerAdapter(this.getMessagesByRoomFeature);
        this.getUserByIdHttpControllerApi = new GetUserByIdApiHttpControllerAdapter(this.getUserByIdFeature);
        this.sendMessageHttpControllerApi = new SendMessageApiHttpControllerAdapter(this.sendMessageFeature);
    }

}


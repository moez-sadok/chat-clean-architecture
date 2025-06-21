
import { IChatHttpController, IHttpController } from "../../../../core/controllers";
import { DataBaseMapper, IChatDatabase, IChatRepository } from "../../../../core/repositories";
import { ChatServerMemoryImpl } from "../ws/chat-server.memory.impl";
import { GetUserByIdPresenterAPI, SendMessagePresenterApi } from "../../../../core/presenter";
import { IChatServerPort } from "../../../../core/gateways";
import { DataBaseMemoryImpl, DataBaseMemoryPerfImpl } from "../../../../libs/chat/frameworks/db/in-memory-db/src";
import { ChatHttpControllerApiMemory, GetMessagesRoomHttpControllerApiMemory, GetUserRoomsHttpControllerApiMemory } from "../http/chat-controller.api-memory";
import { GetRoomsByUserFeature, GetUserByIdFeature, GetMessagesByRoomFeature, SendMessageFeature, IGetRoomsByUserRequester, IGetUserByIdInput, IGetMessagesByRoomInput, ISendMessageInput, SendMessagePerfFeature, GetRoomsByUserPresenterAPI, GetMessagesByRoomPresenterApi } from "../../../../core/application/usecases";

export class AppBackendDouble {

    dataBase!: IChatDatabase;
    chatdbMapper!: IChatRepository;
    chatServer!: IChatServerPort;
    // api controllers
    getUserRoomsHttpControllerApi!: IHttpController;
    getMessagesRoomHttpControllerApi!: IHttpController;
    apiChatController!: IChatHttpController; //as facade
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
        this.getUserByIdFeature = new GetUserByIdFeature(this.chatdbMapper, new GetUserByIdPresenterAPI());
        this.getMessagesByRoomFeature = new GetMessagesByRoomFeature(this.chatdbMapper, new GetMessagesByRoomPresenterApi());
        // this.sendMessageFeature = new SendMessageFeature(this.chatdbMapper, new SendMessagePresenterApi(), this.chatServer);
        this.sendMessageFeature = new SendMessagePerfFeature(this.chatdbMapper, new SendMessagePresenterApi(), this.chatServer);
        // init api controller
        this.apiChatController = new ChatHttpControllerApiMemory(this.getUserByIdFeature, this.sendMessageFeature);
        // controller by feature
        this.getUserRoomsHttpControllerApi = new GetUserRoomsHttpControllerApiMemory(new GetRoomsByUserPresenterAPI(), this.getRoomsByUserFeature);
        this.getMessagesRoomHttpControllerApi = new GetMessagesRoomHttpControllerApiMemory(new GetMessagesByRoomPresenterApi(),this.getMessagesByRoomFeature)
    }

}



import { IChatHttpController } from "../../../../core/controllers";
import { DataBaseMapper, IChatDatabase, IChatRepository } from "../../../../core/repositories";
import { ChatServerMemoryImpl } from "../ws/chat-server.memory.impl";
import { GetMessagesByRoomPresenterApi, GetRoomsByUserPresenterAPI, GetUserByIdPresenterAPI, IChatView, SendMessagePresenterApi } from "../../../../core/presenter";
import { IChatServerPort } from "../../../../core/gateways";
import { DataBaseMemoryImpl } from "../../../../libs/chat/frameworks/db/in-memory-db/src";
import { ChatHttpControllerApiMemory } from "../http/chat-controller.api-memory";
import { GetRoomsByUserFeature, GetUserByIdFeature, GetMessagesByRoomFeature, SendMessageFeature, IGetRoomsByUserInput, IGetUserByIdInput, IGetMessagesByRoomInput, ISendMessageInput } from "../../../../core/features/chat";

export class AppBackendDouble {

    dataBase!: IChatDatabase;
    chatdbMapper!: IChatRepository;
    chatServer!: IChatServerPort;
    apiChatController!: IChatHttpController;
    //features
    getRoomsByUserFeature: IGetRoomsByUserInput;
    getUserByIdFeature: IGetUserByIdInput;
    getMessagesByRoomFeature: IGetMessagesByRoomInput;
    sendMessageFeature: ISendMessageInput;

    constructor() {
        // init db and ws server
        this.dataBase = new DataBaseMemoryImpl();
        this.chatdbMapper = new DataBaseMapper(this.dataBase);
        this.chatServer = new ChatServerMemoryImpl();
        // init features
        this.getRoomsByUserFeature = new GetRoomsByUserFeature(this.chatdbMapper, new GetRoomsByUserPresenterAPI());
        this.getUserByIdFeature = new GetUserByIdFeature(this.chatdbMapper, new GetUserByIdPresenterAPI());
        this.getMessagesByRoomFeature = new GetMessagesByRoomFeature(this.chatdbMapper, new GetMessagesByRoomPresenterApi());
        this.sendMessageFeature = new SendMessageFeature(this.chatdbMapper, new SendMessagePresenterApi(), this.chatServer);
        // init api controller
        this.apiChatController = new ChatHttpControllerApiMemory(this.getRoomsByUserFeature, this.getUserByIdFeature, this.getMessagesByRoomFeature, this.sendMessageFeature);
    }

}


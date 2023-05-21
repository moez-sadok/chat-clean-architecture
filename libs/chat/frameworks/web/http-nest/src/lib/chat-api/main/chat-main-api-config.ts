import { ChatApiControllerImpl, IChatApiController } from "@chat-clean-architecture/chat/adapters/controllers";
import { IChatDatabase, DataBaseMapper } from "@chat-clean-architecture/chat/adapters/gateways";
import { ChatServerImpl } from "@chat-clean-architecture/chat/adapters/gateways/server-gateway";
import { ChatInMemoryServerImpl } from "@chat-clean-architecture/chat/adapters/presenters";
//import { UserWebViewServerImpl } from "@chat-clean-architecture/chat/adapters/views";
import { ChatInteractorInMemoryImpl, IChatControllerInputBoundary, IChatPresenterOutputBoundary, IChatServer, IDataAccess } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { DataBaseMemoryImpl } from "@chat-clean-architecture/chat/frameworks/db/in-memory-db";

//using the DI (nestjs injection see chat.providers.module)
// Main app role for the server (no view , only api presenter)
export class ChatAppMainConfig {

  //chatView: IChatView;

  //chatController: IChatController;
  chatController: IChatApiController;
  chatPresenter: IChatPresenterOutputBoundary;
  chatInteractor: IChatControllerInputBoundary;
  chatServer: IChatServer;

  chatDbMapper: IDataAccess;
  memoryDb: IChatDatabase;

  constructor() {
    this.memoryDb = new DataBaseMemoryImpl();
    this.chatDbMapper = new DataBaseMapper(this.memoryDb);
    this.chatServer = new ChatServerImpl(this.chatDbMapper);
    //this.chatView = new UserWebViewServerImpl();
    this.chatPresenter = new ChatInMemoryServerImpl();
    //this.chatInteractor = new ChatInteractorServerImpl(this.chatDbMapper, this.chatPresenter);
    this.chatInteractor = new ChatInteractorInMemoryImpl(this.chatDbMapper, this.chatPresenter, this.chatServer);
    //this.chatController = new ChatControllerImpl(this.chatInteractor);
    this.chatController = new ChatApiControllerImpl(this.chatInteractor);
  }

}

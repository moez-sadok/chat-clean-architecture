import { ChatApiControllerImpl, IChatApiController } from "@chat-clean-architecture/chat/adapters/controllers";
import { IChatDatabase, DataBaseMapper } from "@chat-clean-architecture/chat/adapters/gateways";
import { ChatServerImpl } from "@chat-clean-architecture/chat/adapters/gateways/server-gateway";
import { ChatPresenterApiImpl } from "@chat-clean-architecture/chat/adapters/presenters";
//import { UserWebViewClientImpl } from "@chat-clean-architecture/chat/adapters/views";
import { ChatInteractorInMemoryImpl, IChatControllerInputBoundary, IChatPresenterOutputBoundary, IChatServer, IDataAccess } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { DataBaseMemoryImpl } from "@chat-clean-architecture/chat/frameworks/db/in-memory-db";

// Not used (one main example) now using the DI (nestjs injection see chat.main.config.providers.module)
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
    //this.chatView = new UserWebViewClientImpl();
    this.chatPresenter = new ChatPresenterApiImpl();
    //this.chatInteractor = new ChatInteractorServerImpl(this.chatDbMapper, this.chatPresenter);
    this.chatInteractor = new ChatInteractorInMemoryImpl(this.chatDbMapper, this.chatPresenter, this.chatServer);
    //this.chatController = new ChatControllerImpl(this.chatInteractor);
    this.chatController = new ChatApiControllerImpl(this.chatInteractor);
  }

}

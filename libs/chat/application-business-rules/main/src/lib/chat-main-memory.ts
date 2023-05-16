
import { ChatControllerImpl } from '@chat-clean-architecture/chat/adapters/controllers';
import { IChatDatabase, DataBaseMapper } from '@chat-clean-architecture/chat/adapters/gateways';
import { IChatWebViewScreen, ChatWebPresenterImpl, ChatDataViewModelDto, MessageDataViewModelDto, RoomDataViewModelDto } from '@chat-clean-architecture/chat/adapters/presenters';
import { UserWebViewServerImpl } from '@chat-clean-architecture/chat/adapters/views';
import { IChatPresenterOutputBoundary, IChatControllerInputBoundary, IDataAccess, IChatServer, ChatServerImpl, ChatInteractorImpl, SendMessageInputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatAppMainFacade } from './interfaces/chat.app.main.facade';
import { DataBaseMemoryImpl } from '@chat-clean-architecture/chat/frameworks/db/in-memory-db';

// Main app role for the server
export class ChatAppMainMemory implements IChatAppMainFacade {
  chatView: IChatWebViewScreen;

  chatController: ChatControllerImpl;
  chatPresenter: IChatPresenterOutputBoundary;
  chatInteractor: IChatControllerInputBoundary;

  chatDbMapper: IDataAccess;
  database: IChatDatabase;

  chatServer: IChatServer;

  constructor() {
    //in momory database
    this.database = new DataBaseMemoryImpl();
    //this.database = new DataBaseMongoImpl();
    this.chatDbMapper = new DataBaseMapper(this.database);
    // in memory chatServer
    this.chatServer = new ChatServerImpl(this.chatDbMapper);

    this.chatView = new UserWebViewServerImpl();
    //this.chatView = new UserMobileViewImpl(); //pdf , api ... 
    this.chatPresenter = new ChatWebPresenterImpl(this.chatView);
    //this.chatPresenter = new ChatMobilePresenterImpl(this.chatView);
    this.chatInteractor = new ChatInteractorImpl(
      this.chatDbMapper,
      this.chatPresenter,
      this.chatServer
    );
    this.chatController = new ChatControllerImpl(this.chatInteractor);
  }

  getUserChatView(userId: number): Promise<ChatDataViewModelDto> {
    this.chatController.getUserRooms(userId);
    return new Promise((resolve) => {
      resolve(this.chatView.chatDataViewModelDto);
    });
  }

  getRoomMessages(roomId: number,roomeName: string, userId: number): Promise<MessageDataViewModelDto[]> {
    const room: RoomDataViewModelDto = { roomId: roomId, name: '' };
    this.chatView.setActiveRoom(room);
    this.chatController.getRoomMessages(room.roomId,roomeName, userId);
    return new Promise((resolve) => {
      resolve(this.chatView.chatDataViewModelDto.activeRoomMessages || []);
    });
  }

  sendMessage(message: SendMessageInputData): Promise<MessageDataViewModelDto> {
    if (message.roomId == null || message.roomId == undefined)
      throw new Error('No selected room');
    this.chatController.sendMessage(
      message.roomId,
      message.userId,
      message.message
    );
    return new Promise((resolve) => {
      //resolve(this.chatView.lastMessage);
    });
  }

  receiveMessage(): Promise<MessageDataViewModelDto> {
    return new Promise((resolve) => {
     // resolve(this.chatView.lastMessage);
    });
  }

  //driver/web server behavior
  initUserConnection(connectedUserId: number): void {
    console.log('init user data for user id:', connectedUserId);
    //throw new Error('Method not implemented.');
  }

  leaveRoom(currentroomId: number): void {
    console.log('leave Room id:', currentroomId);
    //throw new Error('Method not implemented.');
  }

  joinRoom(roomId: number): void {
    console.log('join room id:', roomId);
    //throw new Error('Method not implemented.');
  }

}

import { IChatPresenterOutputBoundary, IChatServer, IDataAccess, SendMessageInputData } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { IConnectedUser } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { UserDto } from "@chat-clean-architecture/chat/entreprise-business-rules/dtos";
import { IChatroom, IMessage, Message, Chatroom, Participant, IParticpant, BotParticipant } from "@chat-clean-architecture/chat/entreprise-business-rules/entities";
import { ConnectedUserImpl } from "./connected-user.impl";

export class ChatServerImpl implements IChatServer {

  private connectetdUsers: Record<number, IConnectedUser> = {};
  private rooms: Record<number, IChatroom> = {};

  constructor(protected chatdataBase: IDataAccess) {
    this.initServer();
  }

  getConnectetdUsers(): Record<string, IConnectedUser> {
    return this.connectetdUsers;
  }

  getRooms(): Record<string, IChatroom> {
    return this.rooms;
  }

  setRooms(rooms: Record<string, IChatroom>): void {
    this.rooms = rooms;
  }

  connectUser(user: IConnectedUser): boolean {
    const userId = user.getUser().id;
    if(userId != null || userId != undefined && !this.connectetdUsers[userId]) {
      this.connectetdUsers[userId] = user;
      return true;
    }
    return false;
  }

  connectUserPresenter(user: UserDto,presenter: IChatPresenterOutputBoundary): boolean {
    const cuser : IConnectedUser = new ConnectedUserImpl(user,presenter);
   return this.connectUser(cuser);
  }

  getUserPresenter(userId: number): IChatPresenterOutputBoundary {
    if(!this.connectetdUsers[userId]) throw new Error('ChatServer Error: getUserPresenter not found for user id: '+userId); 
    return this.connectetdUsers[userId].getPresenter();
  }

  disconnectUser(user: IConnectedUser): void {
    const userId = user.getUser().id;
    if (userId && this.connectetdUsers[userId]) delete this.connectetdUsers[userId];
  }

  broadcast(msg: SendMessageInputData): void {
    const currUser = this.chatdataBase.getUserById(msg.userId);
    const currRoom = this.rooms[msg.roomId];
    if(!currRoom) console.log('Room not found: search in database or in service discovery from another chatserver instance')
    const currPart = currRoom.getParticipants()[currUser.name];
    const message: IMessage = new Message(msg.message, currRoom, currPart);
    currRoom.broadcastMessage(message, currPart);
    //to fix ..
    Object.values(currRoom.getParticipants()).forEach(participant => {
      const participantUserId = participant.getUser().id;
      if (participantUserId == null || participantUserId == undefined) throw new Error('ChatServer Error: Participant in room don t have a user');
      if(!this.connectetdUsers[participantUserId]) console.log('User not connected: send notification or search in service discovery for another chatserver instance, userid= '+participantUserId)  
      else this.connectetdUsers[participantUserId].receive({
        chatRoomId: msg.roomId,
        message: msg.message,
        participantName: currUser.name
      });
    });
  }

  initServer(): void {
    const chatRooms: Record<string, Chatroom> = {};
    this.chatdataBase.getChatRooms().map(roomDto => {
      const roomEntity: Chatroom = new Chatroom(roomDto.name);
      const parts: Participant[] = Object.values(roomDto.participants).map(partDto => {
        return partDto.isBot ? new BotParticipant(partDto.user) : new Participant(partDto.user);
      });
      //set participants
      roomEntity.initChatRoom(parts, []);
      //set messages
      const roomMessages: Message[] = roomDto.messages
        ? roomDto.messages.map(rm => {
          const roomParts = roomEntity.getParticipants();
          const userName = rm.from.user.name;
          const partM: IParticpant = roomParts[userName];
          return new Message(rm.message, roomEntity, partM);
        }) : [];
      roomEntity.initChatRoom([], roomMessages);
      //add to rooms
      chatRooms[roomDto.id] = roomEntity;
    });
    this.setRooms(chatRooms);
    //console.log('Init server complete');
  }

}

import { ChatroomTable, IChatDatabase, MessageTable, ParticipantTable, UserTable } 
from '@cca/core-gateways';

export class DataBaseMemoryImpl implements IChatDatabase {
  
  lastMessageId = 0;
  lastRoomId = 0;
  lastParticipantId = 0;
  lastUserId = 0;

  private users: Record<number, UserTable> = {};
  private rooms: Record<number, ChatroomTable> = {};
  private participants: Record<number, ParticipantTable> = {};
  private messages: Record<number, MessageTable> = {};

  constructor() {
    this.seed();
  }

  async createDb(): Promise<void> {
    this.seed();
  }

  async closeDb(): Promise<void> {
    //nothing to release: the store lives in this process
  }

  async getChatRooms(): Promise<ChatroomTable[]> {
     return Object.values(this.rooms);
  }

  async insertMessage(message: MessageTable): Promise<MessageTable> {
    const newId = this.lastMessageId + 1;
    const tabelMessage = { ...message, id: newId };
    this.messages[newId] = tabelMessage;
    this.lastMessageId = newId;
    return tabelMessage;
  }

  //getters
  async getMessagesByRoom(roomId: number): Promise<MessageTable[]> {
    //perf issue (dedicated db + replicat nodes + use pagination + archive db + sharding by period (ex. 3 months))
    return Object.values(this.messages).filter((m) => m.roomId == roomId);
  }

  async getParticipantByRoomAndUser(roomId: number, userId: number): Promise<ParticipantTable> {
    //perf issue (using getParticipantsByUser & getParticipantsByRoom)
    const part = Object.values(this.participants).find(
      (p) => p.chatRoomId === roomId && p.userId === userId
    );
    if (!part) throw new Error('User is not a participant in this chat room');
    return part;
  }

  async getParticipantsByUser(userId: number): Promise<ParticipantTable[]> {
    //perf issue (revers nosql: userParts.getParticipantsIds())
    return Object.values(this.participants).filter((p) => p.userId === userId);
  }

  async getParticipantsByRoom(roomId: number): Promise<ParticipantTable[]> {
    //perf issue (revers nosql: room.getParticipantsIds() add max particpants by room)
    return Object.values(this.participants).filter(
      (p) => p.chatRoomId === roomId
    );
  }

  async getUses(): Promise<UserTable[]> {
    return Object.values(this.users);
  }

  async getRoomById(roomId: number): Promise<ChatroomTable> {
    return this.rooms[roomId];
  }

  async getRoomsByIds(roomIds: number[]): Promise<ChatroomTable[]> {
    return roomIds.map((id) => this.rooms[id]).filter((r) => !!r);
  }

  async getParticipantById(participantId: number): Promise<ParticipantTable> {
    return this.participants[participantId];
  }

  async getParticipantsByIds(participantIds: number[]): Promise<ParticipantTable[]> {
    return participantIds.map((id) => this.participants[id]).filter((p) => !!p);
  }

  async getUserById(userId: number): Promise<UserTable> {
    //console.log('user',this.users);
    return this.users[userId];
  }

  async getUsersByIds(userIds: number[]): Promise<UserTable[]> {
    return userIds.map((id) => this.users[id]).filter((u) => !!u);
  }

  async insertUser(user: UserTable): Promise<UserTable> {
    const newId = this.lastUserId + 1;
    const tabelUser = { ...user, id: newId };
    this.users[newId] = tabelUser;
    this.lastUserId = newId;
    return tabelUser;
  }

  async insertChatRoom(chatRoom: ChatroomTable): Promise<ChatroomTable> {
    const newId = this.lastRoomId + 1;
    const tabelroom = { ...chatRoom, id: newId };
    this.rooms[newId] = tabelroom;
    this.lastRoomId = newId;
    return tabelroom;
  }
  
  async removeParticipant(id: number): Promise<void> {
    if (this.lastParticipantId === id)
      this.lastParticipantId = this.lastParticipantId - 1;
    delete this.participants[id];
  }

  async insertParticipant(participant: ParticipantTable): Promise<ParticipantTable> {
    const newId = this.lastParticipantId + 1;
    const tabelPart = { ...participant, id: newId };
    this.participants[newId] = tabelPart;
    this.lastParticipantId = newId;
    return tabelPart;
  }

  private seed(): void {
    //init users
    this.users = [
      { id: 0, name: 'Yuri' },
      { id: 1, name: 'Amelie' },
      { id: 2, name: 'Samir' },
      { id: 3, name: 'Sandra' },
      { id: 4, name: 'Jhon' },
      { id: 5, name: 'Bot' },
    ];

    this.rooms = [
      { id: 0, name: 'Tennis' },
      { id: 1, name: 'Yuri & Ameli' },
      { id: 2, name: 'Disco' },
      { id: 3, name: 'Bot & Sandra' },
    ];

    this.participants = [
      { id: 0, userId: 0, chatRoomId: 0 },
      { id: 1, userId: 1, chatRoomId: 0 },
      { id: 2, userId: 2, chatRoomId: 0 },

      { id: 3, userId: 0, chatRoomId: 1 },
      { id: 4, userId: 1, chatRoomId: 1 },

      { id: 5, userId: 2, chatRoomId: 2 },
      { id: 6, userId: 3, chatRoomId: 2 },
      { id: 7, userId: 4, chatRoomId: 2 },
      //bot & sandra
      { id: 8, userId: 3, chatRoomId: 3 },
      { id: 9, userId: 5, chatRoomId: 3, isBot : true },
    ];

    this.messages = [
      { id: 0, roomId: 0, participantId: 0, content: 'Hello' },
      { id: 1, roomId: 0, participantId: 1, content: 'Hi' },
      { id: 2, roomId: 0, participantId: 2, content: 'cc' },
      {
        id: 3,
        roomId: 1,
        participantId: 3,
        content: 'going to the tennis club!',
      },
      { id: 4, roomId: 1, participantId: 4, content: "no , i'm tired" },

      { id: 5, roomId: 2, participantId: 5, content: 'disco party tonight?' },
    ];

    this.lastRoomId = 3;
    this.lastMessageId = 5;
    this.lastUserId = 5;
    this.lastParticipantId = 9;
  }

}

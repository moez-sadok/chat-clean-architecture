import { ChatroomTable, IChatDatabase, MessageTable, ParticpantTable, UserTable } from '@chat-clean-architecture/chat/adapters/gateways';

export class DataBaseMemoryImpl implements IChatDatabase {
  
  lastMessageId = 0;
  lastRoomId = 0;
  lastParticipantId = 0;
  lastUserId = 0;

  private users: Record<number, UserTable> = {};
  private rooms: Record<number, ChatroomTable> = {};
  private participants: Record<number, ParticpantTable> = {};
  private messages: Record<number, MessageTable> = {};

  constructor() {
    this.createDb();
  }

  getChatRooms(): ChatroomTable[] {
     return Object.values(this.rooms);
  }

  insertMessage(message: MessageTable): MessageTable {
    const newId = this.lastMessageId + 1;
    const tabelMessage = { ...message, id: newId };
    this.messages[newId] = tabelMessage;
    this.lastMessageId = newId;
    return tabelMessage;
  }

  //getters
  getMessageByRoom(roomId: number): MessageTable[] {
    //perf issue
    return Object.values(this.messages).filter((m) => m.roomId == roomId);
  }

  getParticipantByRoomAndUser(roomId: number, userId: number): ParticpantTable {
    //perf issue
    const part = Object.values(this.participants).find(
      (p) => p.chatRoomId === roomId && p.userId === userId
    );
    if (!part) throw new Error('User is not a participant in this chat room');
    return part;
  }

  getParticipantsByUser(userId: number): ParticpantTable[] {
    //perf issue
    return Object.values(this.participants).filter((p) => p.userId === userId);
  }

  getParticipantsByRoom(roomId: number): ParticpantTable[] {
    //perf issue
    return Object.values(this.participants).filter(
      (p) => p.chatRoomId === roomId
    );
  }

  getUses(): UserTable[] {
    return Object.values(this.users);
  }

  getRoomById(roomId: number): ChatroomTable {
    return this.rooms[roomId];
  }

  getParticipantById(participantId: number): ParticpantTable {
    return this.participants[participantId];
  }

  getUserById(userId: number): UserTable {
    return this.users[userId];
  }

  createDb() {
    //init users
    this.users = [
      { id: 0, name: 'Yuri' },
      { id: 1, name: 'Amelie' },
      { id: 2, name: 'Samir' },
      { id: 3, name: 'Sandra' },
      { id: 4, name: 'Jhon' },
    ];

    this.rooms = [
      { id: 0, name: 'Tennis' },
      { id: 1, name: 'Yuri & Ameli' },
      { id: 2, name: 'Disco' },
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
    ];

    this.messages = [
      { id: 0, roomId: 0, participantId: 0, content: 'Hello' },
      { id: 1, roomId: 0, participantId: 1, content: 'Hi' },
      { id: 2, roomId: 0, participantId: 2, content: 'cc' },

      {
        id: 3,
        roomId: 1,
        participantId: 3,
        content: 'going to the tennis club',
      },
      { id: 4, roomId: 1, participantId: 4, content: "no , i'm tired" },

      { id: 5, roomId: 2, participantId: 5, content: 'disco party tonight' },
    ];

    this.lastRoomId = 2;
    this.lastMessageId = 5;
    this.lastParticipantId = 7;
  }

  // insertChatRoom(chatRoom: ChatroomTable): ChatroomTable {
  //   const newId = this.lastRoomId + 1;
  //   const tabelroom = { ...chatRoom, id: newId };
  //   this.rooms[newId] = tabelroom;
  //   this.lastRoomId = newId;
  //   return tabelroom;
  // }
  
  // removeParticipant(id: number): void {
  //   if (this.lastParticipantId === id)
  //     this.lastParticipantId = this.lastParticipantId - 1;
  //   delete this.participants[id];
  // }

  // insertParticipant(participant: ParticpantTable): ParticpantTable {
  //   const newId = this.lastParticipantId + 1;
  //   const tabelPart = { ...participant, id: newId };
  //   this.participants[newId] = tabelPart;
  //   this.lastParticipantId = newId;
  //   return tabelPart;
  // }

  // insertUser(user: UserTable): UserTable {
  //   const newId = this.lastParticipantId + 1;
  //   const tabelUser = { ...user, id: newId };
  //   this.users[newId] = tabelUser;
  //   this.lastUserId = newId;
  //   return tabelUser;
  // }

}

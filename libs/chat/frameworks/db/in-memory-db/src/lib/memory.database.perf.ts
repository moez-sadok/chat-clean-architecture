import { ChatroomTable, IChatDatabase, MessageTable, ParticpantTable, UserTable }
  from '@cca/core-gateways';

export class DataBaseMemoryPerfImpl implements IChatDatabase {

  lastMessageId = 0;
  lastRoomId = 0;
  lastParticipantId = 0;
  lastUserId = 0;

  private users: Record<number, UserTable> = {};
  private rooms: Record<number, ChatroomTable> = {};
  private participants: Record<number, ParticpantTable> = {};
  private messages: Record<number, MessageTable> = {};
  private cacheMessagesByRoom: Record<number, MessageTable[]> = {};

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
    //update room messages ids
    this.cacheMessagesByRoom[message.roomId] = this.cacheMessagesByRoom[message.roomId] || [];
    this.cacheMessagesByRoom[message.roomId].push(tabelMessage);
    //
    return tabelMessage;
  }

  //getters
  getMessagesByRoom(roomId: number, page = 1): MessageTable[] {
    const MAX_PER_PAGE = 50;
    const messages = this.cacheMessagesByRoom[roomId] ?? [];
    const start = (page - 1) * MAX_PER_PAGE;
    const end = start + MAX_PER_PAGE;
    return messages.slice(start, end);
    //sol2
    // const MAX_PER_PAGE = 50;
    // const start = (page - 1) * MAX_PER_PAGE;
    // const end = start + MAX_PER_PAGE;
    // const result: MessageTable[] = [];
    // let matchCount = 0;
    // // for (const key in this.messages) {
    // // const message = this.messages[key];
    // for (const message of Object.values(this.messages)) {
    //   if (message.roomId === roomId) {
    //     if (matchCount >= start && matchCount < end) {
    //       result.push(message);
    //     }
    //     matchCount++;
    //     if (matchCount >= end) break;
    //   }
    // }
    // return result;
    //sol3
    //perf issue (dedicated db + replicat nodes + use pagination + archive db + sharding by period (ex. 3 months))
    // return Object.values(this.messages).filter((m) => m.roomId == roomId);
  }

  getParticipantByRoomAndUser(roomId: number, userId: number): ParticpantTable {
    const partsByUser = this.getParticipantsByUser(userId);
    const partsByRoom = this.getParticipantsByRoom(roomId);
    const part = partsByUser.find((p) => partsByRoom.includes(p));
    if (!part) throw new Error('User is not a participant in this chat room');
    return part;
    //  perf issue (using getParticipantsByUser & getParticipantsByRoom)
    // const part = Object.values(this.participants).find(
    //   (p) => p.chatRoomId === roomId && p.userId === userId
    // );
  }

  //TO_REMOVE
  getParticipantsByUser(userId: number): ParticpantTable[] {
    const userTable = this.getUserById(userId);
    if (userTable.participantsIds) return Object.values(userTable.participantsIds).map((id) => this.participants[id]);
    return [];
    //perf issue (revers nosql: userParts.getParticipantsIds())
    //return Object.values(this.participants).filter((p) => p.userId === userId);
  }

  //TO_REMOVE
  getParticipantsByRoom(roomId: number): ParticpantTable[] {
    const roomTable = this.getRoomById(roomId);
    if (roomTable.participantsIds) return roomTable.participantsIds.map((id) => this.participants[id]);
    return [];
    //perf issue (revers nosql: room.getParticipantsIds() add max particpants by room)
    //return Object.values(this.participants).filter((p) => p.chatRoomId === roomId);
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

  insertUser(user: UserTable): UserTable {
    const newId = this.lastUserId + 1;
    const tabelUser = { ...user, id: newId };
    this.users[newId] = tabelUser;
    this.lastUserId = newId;
    return tabelUser;
  }

  insertChatRoom(chatRoom: ChatroomTable): ChatroomTable {
    const newId = this.lastRoomId + 1;
    const tabelroom = { ...chatRoom, id: newId };
    this.rooms[newId] = tabelroom;
    this.lastRoomId = newId;
    return tabelroom;
  }

  removeParticipant(id: number): void {
    //TODO - romove from user and room
    if (this.lastParticipantId === id)
      this.lastParticipantId = this.lastParticipantId - 1;
    delete this.participants[id];
  }

  insertParticipant(participant: ParticpantTable): ParticpantTable {
    const newId = this.lastParticipantId + 1;
    const tabelPart = { ...participant, id: newId };
    this.participants[newId] = tabelPart;
    this.lastParticipantId = newId;
    //update user participants id
    const currUser = this.users[participant.userId];
    if (!currUser.participantsIds) currUser.participantsIds = {};
    currUser.participantsIds[newId] = newId;
    // update room participants id
    const currRoom = this.getRoomById(participant.chatRoomId);
    if (!currRoom.participantsIds) currRoom.participantsIds = [];
    currRoom.participantsIds?.push(newId);
    //
    return tabelPart;
  }

  createDb() {
    //init users
    this.users = [
      { id: 0, name: 'Yuri', participantsIds: { 0: 0, 3: 3 } },
      { id: 1, name: 'Amelie', participantsIds: { 1: 1, 4: 4 } },
      { id: 2, name: 'Samir', participantsIds: { 2: 2, 5: 5 } },
      { id: 3, name: 'Sandra', participantsIds: { 6: 6, 8: 8 } },
      { id: 4, name: 'Jhon', participantsIds: { 7: 7 } },
      { id: 5, name: 'Bot', participantsIds: { 9: 9 } }
    ];

    this.rooms = [
      { id: 0, name: 'Tennis', participantsIds: [0, 1, 2] },
      { id: 1, name: 'Yuri & Ameli', participantsIds: [0, 1] },
      { id: 2, name: 'Disco', participantsIds: [2, 3, 4] },
      { id: 3, name: 'Bot & Sandra', participantsIds: [3, 5] }
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
      { id: 9, userId: 5, chatRoomId: 3, isBot: true },
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
    //init cache
    for (const message of Object.values(this.messages)) {
      if (!this.cacheMessagesByRoom[message.roomId])
        this.cacheMessagesByRoom[message.roomId] = [];
      this.cacheMessagesByRoom[message.roomId].push(message);
    }

    this.lastRoomId = 3;
    this.lastMessageId = 5;
    this.lastUserId = 5;
    this.lastParticipantId = 9;
  }

}

import { ChatroomTable, MessageTable, ParticipantTable, UserTable } from '@cca/core-gateways';

/**
 * The demo dataset of the in-memory adapter, so a fresh database can back the
 * same walkthrough. Inserted only when MONGO_SEED=true and the database is empty.
 */
export const DEMO_DATASET: {
  users: UserTable[];
  rooms: ChatroomTable[];
  participants: ParticipantTable[];
  messages: MessageTable[];
} = {
  users: [
    { id: 0, name: 'Yuri', participantsIds: { 0: 0, 3: 3 } },
    { id: 1, name: 'Amelie', participantsIds: { 1: 1, 4: 4 } },
    { id: 2, name: 'Samir', participantsIds: { 2: 2, 5: 5 } },
    { id: 3, name: 'Sandra', participantsIds: { 6: 6, 8: 8 } },
    { id: 4, name: 'Jhon', participantsIds: { 7: 7 } },
    { id: 5, name: 'Bot', participantsIds: { 9: 9 } }
  ],
  rooms: [
    { id: 0, name: 'Tennis', participantsIds: [0, 1, 2] },
    { id: 1, name: 'Yuri & Ameli', participantsIds: [0, 1] },
    { id: 2, name: 'Disco', participantsIds: [2, 3, 4] },
    { id: 3, name: 'Bot & Sandra', participantsIds: [3, 5] }
  ],
  participants: [
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
    { id: 9, userId: 5, chatRoomId: 3, isBot: true }
  ],
  messages: [
    { id: 0, roomId: 0, participantId: 0, content: 'Hello' },
    { id: 1, roomId: 0, participantId: 1, content: 'Hi' },
    { id: 2, roomId: 0, participantId: 2, content: 'cc' },
    { id: 3, roomId: 1, participantId: 3, content: 'going to the tennis club!' },
    { id: 4, roomId: 1, participantId: 4, content: "no , i'm tired" },
    { id: 5, roomId: 2, participantId: 5, content: 'disco party tonight?' }
  ]
};

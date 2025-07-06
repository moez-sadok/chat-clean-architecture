import { expect, test } from "@jest/globals";
import { ChatroomDto } from "../../../core/dtos/models/chatroom.dto";
import { ServerMainDouble } from "../doubles/app/server.main";
import { IChatClient } from "../../../core/domain";
// import { IChatClient } from "../../../core/gateways";

export const MAX_USERS = 200000; //
export const MAX_CONCURRENT_MESSAGES = 10;

describe('Server Main Perf Memory Tesing ( 200.000 connected user in one room )...', () => {
    const main = new ServerMainDouble();
    let clients: IChatClient[] = [];
    let room: ChatroomDto;
    const msg = 'Hello from main';
    beforeAll(async () => {
        console.time('Server Main Perf Memory Tesing - Init time');
        room = await main.addNewRoom('test-room');
        for (let i = 0; i < MAX_USERS; i++) {
            const newClient = await main.makeClient('user-' + i);
            await main.addClientToRoom(newClient.getId(), room.id);
            clients.push(newClient);
        }
        console.timeEnd('Server Main Perf Memory Tesing - Init time')
    });

    test('Sent one message', async () => {
        const firstClient = clients[0];
        const lastClient = clients[MAX_USERS - 1];
        const c1rooms = await main.backend.getRoomsByUserFeature.getRoomsByUser({ userId: firstClient.getId() });
        const c2rooms = await main.backend.getRoomsByUserFeature.getRoomsByUser({ userId: lastClient.getId() });
        const c1room = c1rooms[0];
        const c2room = c2rooms[0];

        if (!c1room || !c2room) throw new Error('One of clients not exist in the room')

        main.backend.sendMessageFeature.sendMessage({ roomId: c1room.roomId, userId: firstClient.getId(), message: msg })

        const lastClientMsgs = (await main.backend.getMessagesByRoomFeature.getChatRoomsMessages({ roomId: c1room.roomId })).messages;
        const lastMsg = lastClientMsgs[lastClientMsgs.length - 1].message;
        expect(lastMsg).toBe(msg);
    })


    test('One user send multi messages', async () => {
        const firstClient = clients[0];
        const lastClient = clients[MAX_USERS - 1];
        const c1rooms = await main.backend.getRoomsByUserFeature.getRoomsByUser({ userId: firstClient.getId() });
        const c2rooms = await main.backend.getRoomsByUserFeature.getRoomsByUser({ userId: lastClient.getId() });
        const c1room = c1rooms[0];
        const c2room = c2rooms[0];

        if (!c1room || !c2room) throw new Error('One of clients not exist in the room')

        let lastSentMessage = '';
        for (let i = 0; i < MAX_CONCURRENT_MESSAGES; i++) {
            lastSentMessage = msg + '-i';
            main.backend.sendMessageFeature.sendMessage({ roomId: c1room.roomId, userId: firstClient.getId(), message: lastSentMessage })
        }

        const lastClientMsgs = (await main.backend.getMessagesByRoomFeature.getChatRoomsMessages({ roomId: c1room.roomId })).messages;
        const lastMsg = lastClientMsgs[lastClientMsgs.length - 1].message;
        expect(lastMsg).toBe(lastSentMessage);
    })

     test('Multi users send multi messages', async () => {
        const firstClient = clients[0];
        const lastClient = clients[MAX_USERS - 1];
        const c1rooms = await main.backend.getRoomsByUserFeature.getRoomsByUser({ userId: firstClient.getId() });
        const c2rooms = await main.backend.getRoomsByUserFeature.getRoomsByUser({ userId: lastClient.getId() });
        const c1room = c1rooms[0];
        const c2room = c2rooms[0];

        if (!c1room || !c2room) throw new Error('One of clients not exist in the room')

        let lastSentMessage = '';
        for (let i = 0; i < MAX_CONCURRENT_MESSAGES; i++) {
            lastSentMessage = msg + '-i';
            main.backend.sendMessageFeature.sendMessage({ roomId: c1room.roomId, userId: clients[i].getId(), message: lastSentMessage })
        }

        const lastClientMsgs = (await main.backend.getMessagesByRoomFeature.getChatRoomsMessages({ roomId: c1room.roomId})).messages;
        const lastMsg = lastClientMsgs[lastClientMsgs.length - 1].message;
        expect(lastMsg).toBe(lastSentMessage);
     })

});


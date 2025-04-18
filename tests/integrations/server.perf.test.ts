import { expect, test } from "@jest/globals";
import { ChatroomDto } from "../../core/dtos/models/chatroom.dto";
import { ServerMainDouble } from "./doubles/app/server.main";
import { IChatClient } from "../../core/gateways";

export const MAX_USERS = 500000; // half a milion
export const MAX_CONCURRENT_MESSAGES = 10;

describe('Server Main Perf Memory Tesing ( 500.000 connected user in one room )...', () => {
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

        const lastClientMsgs = await main.backend.getMessagesByRoomFeature.getChatRoomsMessages({ roomId: c1room.roomId, roomName: c1room.roomName });
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
            //firstClient.controller.sendMessage(c1room.roomId, firstClient.id, lastSentMessage);
        }

        const lastClientMsgs = await main.backend.getMessagesByRoomFeature.getChatRoomsMessages({ roomId: c1room.roomId, roomName: c1room.roomName });
        const lastMsg = lastClientMsgs[lastClientMsgs.length - 1].message;
        expect(lastMsg).toBe(lastSentMessage);
    })

    // test('Multi users send multi messages', async () => {
    //     const firstClient = clients[0];
    //     const lastClient = clients[MAX_CONCURRENT_MESSAGES - 1];

    //     const c1room = firstClient.view.chatDataViewModelDto.rooms ? firstClient.view.chatDataViewModelDto.rooms[0] : null;
    //     const c2room = lastClient.view.chatDataViewModelDto.rooms ? lastClient.view.chatDataViewModelDto.rooms[0] : null;

    //     if (!c1room || !c2room) throw new Error('One of clients not exist in the room')
    //     firstClient.controller.getRoomMessages(c1room.roomId, c1room.name, firstClient.id);
    //     lastClient.controller.getRoomMessages(c2room.roomId, c2room.name, lastClient.id);

    //     let lastSentMessage = '';
    //     for (let i = 0; i < MAX_CONCURRENT_MESSAGES; i++) {
    //         lastSentMessage = msg+'-i';
    //         clients[i].controller.sendMessage(c1room.roomId, clients[i].id,lastSentMessage );
    //     }

    //     const lastClientMsgs = await lastClient.controller.getRoomMessages(c1room.roomId, c1room.name, lastClient.id);
    //     const lastMsg = lastClientMsgs[lastClientMsgs.length - 1].message;
    //     expect(lastMsg).toBe(lastSentMessage);
    // })

});


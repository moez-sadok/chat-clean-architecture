import { expect, test } from "@jest/globals";
import { ClientViewController, MainDouble } from "./doubles/app/main";
import { ChatroomDto } from "../../core/dtos/models/chatroom.dto";

export const MAX_USERS = 10000; // perf issui on getChatRoomsByUser (dbMapper)
export const MAX_CONCURRENT_MESSAGES = 10;

describe('Main Perf Memory Tesing ( 10.000 connected user in one room )...', () => {
     const main = new MainDouble();
    let clients: ClientViewController[] = [];
    let room: ChatroomDto;
    const msg = 'Hello from main';
    beforeAll(async () => {
        console.time('Main Perf Memory Tesing - Init time');
        room = await main.addNewRoom('test-room');
        for (let i = 0; i < MAX_USERS; i++) {
            const newClient = await main.makeClient('user-' + i);
            await main.addClientToRoom(newClient.id, room.id);
            newClient.controller.getUserRooms(newClient.id);
            clients.push(newClient);
        }
        console.timeEnd('Main Perf Memory Tesing - Init time')
    });

    test('Sent one message', async () => {
        const firstClient = clients[0];
        const lastClient = clients[MAX_USERS - 1];

        const c1room = firstClient.view.chatDataViewModelDto.rooms ? firstClient.view.chatDataViewModelDto.rooms[0] : null;
        const c2room = lastClient.view.chatDataViewModelDto.rooms ? lastClient.view.chatDataViewModelDto.rooms[0] : null;

        if (!c1room || !c2room) throw new Error('One of clients not exist in the room')
        firstClient.controller.getRoomMessages(c1room.roomId, c1room.name, firstClient.id);
        lastClient.controller.getRoomMessages(c2room.roomId, c2room.name, lastClient.id);

        firstClient.controller.sendMessage(c1room.roomId, firstClient.id, msg);

        const lastClientMsgs = await lastClient.controller.getRoomMessages(c1room.roomId, c1room.name, lastClient.id);
        const lastMsg = lastClientMsgs[lastClientMsgs.length - 1].message;
        expect(lastMsg).toBe(msg);
    })


    test('One user send multi messages', async () => {
        const firstClient = clients[0];
        const lastClient = clients[MAX_USERS - 1];

        const c1room = firstClient.view.chatDataViewModelDto.rooms ? firstClient.view.chatDataViewModelDto.rooms[0] : null;
        const c2room = lastClient.view.chatDataViewModelDto.rooms ? lastClient.view.chatDataViewModelDto.rooms[0] : null;

        if (!c1room || !c2room) throw new Error('One of clients not exist in the room')
        firstClient.controller.getRoomMessages(c1room.roomId, c1room.name, firstClient.id);
        lastClient.controller.getRoomMessages(c2room.roomId, c2room.name, lastClient.id);

        let lastSentMessage = '';
        for (let i = 0; i < MAX_CONCURRENT_MESSAGES; i++) {
            lastSentMessage = msg+'-i';
            firstClient.controller.sendMessage(c1room.roomId, firstClient.id,lastSentMessage );
        }

        const lastClientMsgs = await lastClient.controller.getRoomMessages(c1room.roomId, c1room.name, lastClient.id);
        const lastMsg = lastClientMsgs[lastClientMsgs.length - 1].message;
        expect(lastMsg).toBe(lastSentMessage);
    })

    test('Multi users send multi messages', async () => {
        const firstClient = clients[0];
        const lastClient = clients[MAX_CONCURRENT_MESSAGES - 1];

        const c1room = firstClient.view.chatDataViewModelDto.rooms ? firstClient.view.chatDataViewModelDto.rooms[0] : null;
        const c2room = lastClient.view.chatDataViewModelDto.rooms ? lastClient.view.chatDataViewModelDto.rooms[0] : null;

        if (!c1room || !c2room) throw new Error('One of clients not exist in the room')
        firstClient.controller.getRoomMessages(c1room.roomId, c1room.name, firstClient.id);
        lastClient.controller.getRoomMessages(c2room.roomId, c2room.name, lastClient.id);

        let lastSentMessage = '';
        for (let i = 0; i < MAX_CONCURRENT_MESSAGES; i++) {
            lastSentMessage = msg+'-i';
            clients[i].controller.sendMessage(c1room.roomId, clients[i].id,lastSentMessage );
        }

        const lastClientMsgs = await lastClient.controller.getRoomMessages(c1room.roomId, c1room.name, lastClient.id);
        const lastMsg = lastClientMsgs[lastClientMsgs.length - 1].message;
        expect(lastMsg).toBe(lastSentMessage);
    })

});


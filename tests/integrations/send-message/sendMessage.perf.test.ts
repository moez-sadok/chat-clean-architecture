import { expect, test } from "@jest/globals";
import { ClientViewController, MainDouble } from "../doubles/app/main";
import { ChatroomDto } from "../../../core/dtos/models/chatroom.dto";

export const MAX_USERS = 20000; // perf issue on getChatRoomsByUser (dbMapper)
export const MAX_CONCURRENT_MESSAGES = 10;

describe('Main Perf Memory Tesing ( 20.000 connected user in one room )...', () => {
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
            newClient.getRoomsController.handle({userId:newClient.id});
            clients.push(newClient);
        }
        console.timeEnd('Main Perf Memory Tesing - Init time')
    });

    test('Sent one message', async () => {
        const firstClient = clients[0];
        const lastClient = clients[MAX_USERS - 1];

        const c1room = firstClient.getRoomsView.rooms ? firstClient.getRoomsView.rooms[0] : null;
        const c2room = lastClient.getRoomsView.rooms ? lastClient.getRoomsView.rooms[0] : null;

        if (!c1room || !c2room) throw new Error('One of clients not exist in the room')
        firstClient.getMessagesController.handle({roomId:c1room.roomId});
        lastClient.getMessagesController.handle({roomId:c2room.roomId});

        firstClient.sendMessageController.handle({ roomId: c1room.roomId, userId: firstClient.id, message: msg});

        const lastClientMsgs = (await lastClient.getMessagesController.handle({roomId:c1room.roomId})).messages;
        const lastMsg = lastClientMsgs[lastClientMsgs.length - 1].message;
        expect(lastMsg).toBe(msg);
    })


    test('One user send multi messages', async () => {
        const firstClient = clients[0];
        const lastClient = clients[MAX_USERS - 1];

        const c1room = firstClient.getRoomsView.rooms ? firstClient.getRoomsView.rooms[0] : null;
        const c2room = lastClient.getRoomsView.rooms ? lastClient.getRoomsView.rooms[0] : null;

        if (!c1room || !c2room) throw new Error('One of clients not exist in the room')
        firstClient.getMessagesController.handle({roomId:c1room.roomId});
        lastClient.getMessagesController.handle({roomId:c2room.roomId});

        let lastSentMessage = '';
        for (let i = 0; i < MAX_CONCURRENT_MESSAGES; i++) {
            lastSentMessage = msg+'-'+i;
            firstClient.sendMessageController.handle({ roomId: c1room.roomId, userId: firstClient.id, message: lastSentMessage});
        }

        const lastClientMsgs = (await lastClient.getMessagesController.handle({roomId:c1room.roomId})).messages;
        const lastMsg = lastClientMsgs[lastClientMsgs.length - 1].message;
        expect(lastMsg).toBe(lastSentMessage);
    })

    test('Multi users send multi messages', async () => {
        const firstClient = clients[0];
        const lastClient = clients[MAX_CONCURRENT_MESSAGES - 1];

        const c1room = firstClient.getRoomsView.rooms ? firstClient.getRoomsView.rooms[0] : null;
        const c2room = lastClient.getRoomsView.rooms ? lastClient.getRoomsView.rooms[0] : null;

        if (!c1room || !c2room) throw new Error('One of clients not exist in the room')
        firstClient.getMessagesController.handle({roomId:c1room.roomId});
        lastClient.getMessagesController.handle({roomId:c2room.roomId});

        let lastSentMessage = '';
        for (let i = 0; i < MAX_CONCURRENT_MESSAGES; i++) {
            lastSentMessage = msg+'-'+i;
            clients[i].sendMessageController.handle({ roomId: c1room.roomId, userId: clients[i].id, message: lastSentMessage});
        }

        const lastClientMsgs = (await lastClient.getMessagesController.handle({roomId:c1room.roomId})).messages;
        const lastMsg = lastClientMsgs[lastClientMsgs.length - 1].message;
        expect(lastMsg).toBe(lastSentMessage);
    })

});


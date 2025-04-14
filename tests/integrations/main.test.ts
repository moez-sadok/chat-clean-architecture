import { expect, test } from "@jest/globals";
import { ClientViewController, MainDouble } from "./doubles/app/main";
import { ChatroomDto } from "../../core/dtos/models/chatroom.dto";

describe('Main Memory Tesing...', () => {
    const main = new MainDouble();
    let client1: ClientViewController;
    let client2: ClientViewController;
    let room : ChatroomDto;
    const msg = 'Hello from main';
    beforeEach(async () => {
        client1 = await main.makeClient('user1');
        client2 = await main.makeClient('user2');
        room = await main.addNewRoom('test-room');
        await main.addClientToRoom(client1.id,room.id);
        await main.addClientToRoom(client2.id,room.id);
        client1.controller.getUserRooms(client1.id);
        client2.controller.getUserRooms(client2.id);
    });

    test('Sent message', async () => {
        const c1room = client1.view.chatDataViewModelDto.rooms ? client1.view.chatDataViewModelDto.rooms[0] : null;
        const c2room = client2.view.chatDataViewModelDto.rooms ? client2.view.chatDataViewModelDto.rooms[0] : null;
        
        if (!c1room || !c2room) throw new Error('One of clients not exist in the room')
        client1.controller.getRoomMessages(c1room.roomId, c1room.name, client1.id);
        client2.controller.getRoomMessages(c2room.roomId, c2room.name, client2.id);

        client1.controller.sendMessage(c1room.roomId, client1.id, msg);

        const client2Msgs = await client2.controller.getRoomMessages(c1room.roomId, c1room.name, client2.id);
        const lastMsg = client2Msgs[client2Msgs.length - 1].message;
        expect(lastMsg).toBe(msg);
    })


});


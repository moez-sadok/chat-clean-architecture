import { expect, test } from "@jest/globals";
import { ClientViewController, MainDouble } from "./main";
import { ChatroomDto } from "../../../libs/chat/application-business-rules/interactor/src";

export const MAX_USERS = 10000;

describe('Main Perf Memory Tesing (10 000 connected user in one room )...', () => {
    const main = new MainDouble();
    let clients: ClientViewController[] = [];
    let room : ChatroomDto;
    const msg = 'Hello from main';
    beforeEach(async () => {
        room = await main.addNewRoom('test-room');
        for(let i=0; i< MAX_USERS; i++){
            const newClient = await main.makeClient('user-'+i);
            await main.addClientToRoom(newClient.id,room.id);
            newClient.controller.getUserRooms(newClient.id);
            clients.push(newClient);
        }
    });

    test('Sent message', async () => {
        const client1 = clients[0];
        const client2 = clients[MAX_USERS - 1];

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


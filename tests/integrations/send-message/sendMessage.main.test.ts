import { expect, test } from "@jest/globals";
import { ClientViewController, MainDouble } from "../doubles/app/main";
import { ChatroomDto } from "../../../core/dtos/models/chatroom.dto";

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
        client1.getRoomsController.handle({userId:client1.id});
        client2.getRoomsController.handle({userId:client2.id});
    });

    test('Sent message', async () => {
        const c1room = client1.getRoomsView.rooms ? client1.getRoomsView.rooms[0] : null;
        const c2room = client2.getRoomsView.rooms ? client2.getRoomsView.rooms[0] : null;
        
        if (!c1room || !c2room) throw new Error('One of clients not exist in the room')
        client1.getMessagesController.handle({roomId:c1room.roomId});
        client2.getMessagesController.handle({roomId:c2room.roomId});

        client1.sendMessageController.handle({ roomId: c1room.roomId, userId: client1.id, message: msg});
        const client2Msgs = (await client2.getMessagesController.handle({ roomId: c1room.roomId})).messages;
        const lastMsg = client2Msgs[client2Msgs.length - 1].message;
        expect(lastMsg).toBe(msg);
    })

});


/**
 * @jest-environment node
 */
import { expect, test } from "@jest/globals";
import { MongoClient } from "mongodb";
import { MongoDataBaseImpl } from "../../../libs/chat/frameworks/db/mongo-db/src";
import { ClientViewController, MainDouble } from "../doubles/app/main";
import { ChatroomDto } from "../../../core/dtos/models/chatroom.dto";

/**
 * Runs the whole chat flow against a real MongoDB, with the very same wiring
 * the in-memory double uses: only the IChatDatabase adapter changes.
 * Set MONGO_TEST_URL to point at your server (default: localhost:27017).
 */
const MONGO_URL = process.env['MONGO_TEST_URL'] ?? 'mongodb://localhost:27017';
const MONGO_DB = 'pchat_test_' + Date.now();

const isMongoReachable = async (): Promise<boolean> => {
    const client = new MongoClient(MONGO_URL, { serverSelectionTimeoutMS: 1500 });
    try {
        await client.connect();
        await client.db('admin').command({ ping: 1 });
        return true;
    } catch {
        return false;
    } finally {
        await client.close().catch(() => undefined);
    }
};

describe('Mongo adapter testing...', () => {
    let reachable = false;
    let db: MongoDataBaseImpl;
    let main: MainDouble;
    let client1: ClientViewController;
    let client2: ClientViewController;
    let room: ChatroomDto;
    const msg = 'Hello from mongo';

    beforeAll(async () => {
        reachable = await isMongoReachable();
        if (!reachable) {
            //MONGO_REQUIRED=true turns the skip into a failure (CI, release checks)
            if (process.env['MONGO_REQUIRED'] === 'true')
                throw new Error(`MONGO_REQUIRED is set but no MongoDB answers on ${MONGO_URL}`);
            console.warn(`No MongoDB on ${MONGO_URL}: the mongo adapter suite is skipped.`);
            return;
        }
        db = new MongoDataBaseImpl({ url: MONGO_URL, dbName: MONGO_DB, seed: false });
        await db.createDb();
        main = new MainDouble(db);

        client1 = await main.makeClient('user1');
        client2 = await main.makeClient('user2');
        room = await main.addNewRoom('test-room');
        await main.addClientToRoom(client1.id, room.id);
        await main.addClientToRoom(client2.id, room.id);
    });

    afterAll(async () => {
        if (!reachable) return;
        const cleaner = new MongoClient(MONGO_URL);
        await cleaner.connect();
        await cleaner.db(MONGO_DB).dropDatabase();
        await cleaner.close();
        await db.closeDb();
    });

    test('Each client sees the room he joined', async () => {
        if (!reachable) return;
        const rooms = await client1.getRoomsController.handle({ userId: client1.id });
        expect(rooms.length).toBe(1);
        expect(rooms[0].roomName).toBe('test-room');
    });

    test('Sent message is persisted and read back by the other client', async () => {
        if (!reachable) return;
        await client1.getRoomsController.handle({ userId: client1.id });
        await client2.getRoomsController.handle({ userId: client2.id });

        const c1room = client1.getRoomsView.rooms ? client1.getRoomsView.rooms[0] : null;
        if (!c1room) throw new Error('client1 is not in the room');

        await client1.sendMessageController.handle({ roomId: c1room.roomId, userId: client1.id, message: msg });

        const client2Msgs = (await client2.getMessagesController.handle({ roomId: c1room.roomId })).messages;
        const lastMsg = client2Msgs[client2Msgs.length - 1];
        expect(lastMsg.message).toBe(msg);
        expect(lastMsg.authorName).toBe('user1');
    });

    test('Messages survive a reconnection (they are in the database, not in the process)', async () => {
        if (!reachable) return;
        const reopened = new MongoDataBaseImpl({ url: MONGO_URL, dbName: MONGO_DB, seed: false });
        await reopened.createDb();
        try {
            const otherMain = new MainDouble(reopened);
            const messages = (await otherMain.backend.getMessagesRoomHttpControllerApi
                .handle({ roomId: room.id })).messages;
            expect(messages.map((m: { message: string }) => m.message)).toContain(msg);
        } finally {
            await reopened.closeDb();
        }
    });

    test('A participant removed from a room no longer lists it', async () => {
        if (!reachable) return;
        const participant = await main.backend.chatdbMapper.getParticpantByUserAndRoom(room.id, client2.id);
        await main.backend.chatdbMapper.removeParticipant(participant);
        const rooms = await main.backend.getRoomsByUserFeature.getRoomsByUser({ userId: client2.id });
        expect(rooms.find((r) => r.roomId === room.id)).toBeUndefined();
    });
});

import { defineFeature, DefineStepFunction } from "jest-cucumber";
import { beforeEach, expect } from "@jest/globals";
import { ChatScenario, loadChatFeature } from "../steps/chat-scenario";
import { errorMentionsRoom, noRoomExistsWithId } from "../steps/common-steps";
import { GetMessagesByRoomClientView, GetMessagesByRoomPresenterApi, GetMessagesByRoomUseCase, GetMessagesOutputData, GetRoomsByUserResponseData, MessageOutputData } from "../../../core/application";

const feature = loadChatFeature('get-messages-by-room');

// Records the room the use case hands to its output port: neither the API response
// nor the SPA view carries the participants, which R7 also describes.
class RecordingGetMessagesPresenter extends GetMessagesByRoomPresenterApi {
    room: GetRoomsByUserResponseData | null = null;

    override presentMessages(messages: MessageOutputData[], room: GetRoomsByUserResponseData): GetMessagesOutputData {
        this.room = room;
        return super.presentMessages(messages, room);
    }
}

defineFeature(feature, (test) => {
    const s = new ChatScenario();

    beforeEach(() => s.reset());

    const messagesView = () => s.clients['Alice'].getMessagesView as GetMessagesByRoomClientView;
    const readResult = () => {
        expect(s.error).toBeNull();
        return s.result as GetMessagesOutputData;
    };

    const readMessages = async (roomId: number) => {
        const alice = await s.client('Alice');
        await s.attempt(() => alice.getMessagesController.handle({ roomId }));
    };

    const theChatRoom = (given: DefineStepFunction) =>
        given(/^the chat room "(.*)" with participants Alice and Bob$/, async (name: string) => {
            await s.addRoom(name, ['Alice', 'Bob']);
        });

    const aliceReadsTheMessagesOf = (when: DefineStepFunction) =>
        when(/^Alice reads the messages of "(.*)"$/, async (name: string) => {
            await readMessages(s.room(name).id);
        });

    test('Reading a room that has messages', ({ given, when, then, and }) => {
        let held: { author: string; message: string }[] = [];

        theChatRoom(given);

        given(/^the room "(.*)" holds these messages:$/, async (name: string, table: { author: string; message: string }[]) => {
            held = table;
            for (const { author, message } of table) {
                const client = await s.client(author);
                await client.sendMessageController.handle({ roomId: s.room(name).id, userId: client.id, message });
            }
        });

        aliceReadsTheMessagesOf(when);

        then(/^she gets these (\d+) messages$/, (count: string) => {
            const displayed = messagesView().vm.messages;
            expect(displayed).toHaveLength(Number(count));
            expect(displayed.map((m) => ({ author: m.participantName, message: m.content }))).toEqual(held);
        });

        and('each message gives its author name, its author id and the room id', () => {
            const { messages, roomId } = readResult();
            for (const m of messages) {
                expect(m.authorId).toBe(s.users[m.authorName].id);
                expect(m.chatRoomId).toBe(roomId);
            }
        });
    });

    test('Reading a room that has no messages', ({ given, when, then, and }) => {
        theChatRoom(given);

        given(/^the room "(.*)" holds no messages$/, (name: string) => {
            expect(s.main.backend.chatdbMapper.getMessagesByRoom(s.room(name).id)).toEqual([]);
        });

        aliceReadsTheMessagesOf(when);

        then('she gets an empty list of messages', () => {
            expect(readResult().messages).toEqual([]);
            expect(messagesView().vm.messages).toEqual([]);
        });

        and(/^the room is described with the name "(.*)" and the participants Alice and Bob$/, async (name: string) => {
            expect(messagesView().vm.roomName).toBe(name);
            const presenter = new RecordingGetMessagesPresenter();
            await new GetMessagesByRoomUseCase(s.main.backend.chatdbMapper, presenter).getChatRoomsMessages({ roomId: s.room(name).id });
            expect([...(presenter.room?.participantsNames ?? [])].sort()).toEqual(['Alice', 'Bob']);
        });
    });

    test('Reading a room that does not exist', ({ given, when, then }) => {
        theChatRoom(given);
        noRoomExistsWithId(given, s);

        when(/^Alice reads the messages of room (\d+)$/, async (roomId: string) => {
            await readMessages(Number(roomId));
        });

        errorMentionsRoom(then, s, 'does not exist');
    });
});

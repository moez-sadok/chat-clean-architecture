import { defineFeature, DefineStepFunction } from "jest-cucumber";
import { beforeEach, expect } from "@jest/globals";
import { ChatScenario, loadChatFeature } from "../steps/chat-scenario";
import { errorMentionsRoom, noRoomExistsWithId } from "../steps/common-steps";
import { GetMessagesByRoomClientView } from "../../../core/application";
import { SendMessageOutputData } from "../../../core/application/usecases/send-message/send-message.response";

const feature = loadChatFeature('send-message');

defineFeature(feature, (test) => {
    const s = new ChatScenario();

    beforeEach(() => s.reset());

    const openGeneral = (name: string) => s.openRoom(name, 'General');

    // what the server pushed to a client, as the room view shows it
    const pushedTo = (name: string) =>
        s.clients[name].ws.received.map((m) => ({ content: m.message, participantName: m.authorName, roomId: m.chatRoomId }));

    const shownTo = (name: string) => (s.clients[name].getMessagesView as GetMessagesByRoomClientView).vm.messages;

    const aliceSends = async (message: string, roomId: number) => {
        const alice = await s.client('Alice');
        s.messageCountBefore = await s.messageCount();
        await s.attempt(() => alice.sendMessageController.handle({ roomId, userId: alice.id, message }));
    };

    const background = (given: DefineStepFunction, and: DefineStepFunction) => {
        given(/^the chat room "(.*)" with participants Alice, Bob and Carol$/, async (name: string) => {
            await s.addRoom(name, ['Alice', 'Bob', 'Carol']);
        });

        and('Alice and Bob are connected', async () => {
            await openGeneral('Alice');
            await openGeneral('Bob');
        });
    };

    const aliceSendsIn = (when: DefineStepFunction) =>
        when(/^Alice sends "(.*)" in "(.*)"$/, async (message: string, room: string) => {
            await aliceSends(message, s.room(room).id);
        });

    const receivesFromAlice = (then: DefineStepFunction, receiver: string) =>
        then(new RegExp(`^${receiver} receives "(.*)" from Alice in "(.*)"$`), (message: string, room: string) => {
            expect(pushedTo(receiver)).toEqual([{ content: message, participantName: 'Alice', roomId: s.room(room).id }]);
        });

    const savedInHistory = (then: DefineStepFunction) =>
        then(/^"(.*)" by Alice is saved in the history of "(.*)"$/, async (message: string, room: string) => {
            const history = await s.main.backend.chatdbMapper.getMessagesByRoom(s.room(room).id);
            expect(history[history.length - 1]).toMatchObject({ message, from: { user: { name: 'Alice' } } });
        });

    const aliceGetsTheSentMessageBack = (and: DefineStepFunction) =>
        and('Alice gets the sent message back with her name, her id and the room id', () => {
            expect(s.error).toBeNull();
            expect(s.result as SendMessageOutputData).toMatchObject({
                authorName: 'Alice',
                authorId: s.users['Alice'].id,
                chatRoomId: s.room('General').id,
            });
        });

    // the SPA shows the sent message in the author's open room (one view for two use cases)
    const aliceSeesHerMessage = (and: DefineStepFunction) =>
        and(/^Alice sees "(.*)" in "(.*)"$/, (message: string, room: string) => {
            expect(shownTo('Alice').at(-1)).toEqual({ content: message, participantName: 'Alice', roomId: s.room(room).id });
        });

    const carolIsConnected = (given: DefineStepFunction) =>
        given('Carol is connected', async () => {
            await openGeneral('Carol');
        });

    const aliceDoesNotReceiveHerOwnMessage = (and: DefineStepFunction) =>
        and('Alice does not receive her own message as a new message', () => {
            expect(pushedTo('Alice')).toEqual([]);
        });

    test('A message reaches every online participant', ({ given, and, when, then }) => {
        background(given, and);
        carolIsConnected(given);
        aliceSendsIn(when);
        savedInHistory(then);
        receivesFromAlice(and, 'Bob');
        receivesFromAlice(and, 'Carol');
        aliceDoesNotReceiveHerOwnMessage(and);
        aliceGetsTheSentMessageBack(and);
        aliceSeesHerMessage(and);
    });

    test('Sending a message', ({ given, and, when, then }) => {
        background(given, and);
        aliceSendsIn(when);
        savedInHistory(then);
        aliceGetsTheSentMessageBack(and);
    });

    test('Participants are online', ({ given, and, when, then }) => {
        background(given, and);
        carolIsConnected(given);
        aliceSendsIn(when);
        receivesFromAlice(then, 'Bob');
        receivesFromAlice(and, 'Carol');
        aliceDoesNotReceiveHerOwnMessage(and);
    });

    // the room is already live on the server when Carol connects: she must still get what follows
    test('A participant connects after the room is active', ({ given, and, when, then }) => {
        background(given, and);

        given(/^Alice already sent "(.*)" in "(.*)"$/, async (message: string, room: string) => {
            await aliceSends(message, s.room(room).id);
            expect(s.error).toBeNull();
        });

        and('Carol connects afterwards', async () => {
            await openGeneral('Carol');
        });

        aliceSendsIn(when);
        receivesFromAlice(then, 'Carol');
    });

    test('A participant is offline', ({ given, and, when, then }) => {
        background(given, and);

        given('Carol is not connected', async () => {
            expect(s.isOnline((await s.user('Carol')).id)).toBe(false);
        });

        aliceSendsIn(when);
        receivesFromAlice(then, 'Bob');

        and(/^Carol gets a push notification with "(.*)"$/, async (message: string) => {
            const carol = await s.user('Carol');
            expect(s.main.backend.notifier.sent).toEqual([
                { userId: carol.id, message, description: 'Alice in General' }]);
        });

        and(/^"(.*)" is in the history of "(.*)" when Carol comes back$/, async (message: string, room: string) => {
            const view = await s.openRoom('Carol', room);
            expect(view.vm.messages[view.vm.messages.length - 1]).toEqual(
                { content: message, participantName: 'Alice', roomId: s.room(room).id });
        });
    });

    test('Sending to a room that does not exist', ({ given, and, when, then }) => {
        background(given, and);
        noRoomExistsWithId(given, s);

        when(/^Alice sends "(.*)" in room (\d+)$/, async (message: string, roomId: string) => {
            await aliceSends(message, Number(roomId));
        });

        errorMentionsRoom(then, s, 'was not found');

        and('no message is saved', async () => {
            expect(await s.messageCount()).toBe(s.messageCountBefore);
        });
    });
});

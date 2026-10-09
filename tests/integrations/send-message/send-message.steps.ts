import { defineFeature, DefineStepFunction } from "jest-cucumber";
import { beforeEach, expect } from "@jest/globals";
import { ChatScenario, loadChatFeature } from "../steps/chat-scenario";
import { errorMentionsRoom, noRoomExistsWithId } from "../steps/common-steps";
import { GetMessagesByRoomClientView } from "../../../core/application";
import { SendMessageOutputData } from "../../../core/application/usecases/send-message/interactor/send-message.response.data";

const feature = loadChatFeature('send-message');

defineFeature(feature, (test) => {
    const s = new ChatScenario();
    // messages each client displayed when it opened the room, to tell them from the pushed ones
    let displayedOnOpen: Record<string, number> = {};

    beforeEach(() => {
        s.reset();
        displayedOnOpen = {};
    });

    const openGeneral = async (name: string) => {
        const view = await s.openRoom(name, 'General');
        displayedOnOpen[name] = view.vm.messages.length;
    };

    const pushedTo = (name: string) => {
        const view = s.clients[name].getMessagesView as GetMessagesByRoomClientView;
        return view.vm.messages.slice(displayedOnOpen[name]);
    };

    const aliceSends = async (message: string, roomId: number) => {
        const alice = await s.client('Alice');
        s.messageCountBefore = s.messageCount();
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

    test('Sending a message', ({ given, and, when, then }) => {
        background(given, and);
        aliceSendsIn(when);

        then(/^"(.*)" by Alice is saved in the history of "(.*)"$/, (message: string, room: string) => {
            const history = s.main.backend.chatdbMapper.getMessagesByRoom(s.room(room).id);
            expect(history[history.length - 1]).toMatchObject({ message, from: { user: { name: 'Alice' } } });
        });

        and('Alice gets the sent message back with her name, her id and the room id', () => {
            expect(s.error).toBeNull();
            expect(s.result as SendMessageOutputData).toMatchObject({
                authorName: 'Alice',
                authorId: s.users['Alice'].id,
                chatRoomId: s.room('General').id,
            });
        });
    });

    test('Participants are online', ({ given, and, when, then }) => {
        background(given, and);

        given('Carol is connected', async () => {
            await openGeneral('Carol');
        });

        aliceSendsIn(when);
        receivesFromAlice(then, 'Bob');
        receivesFromAlice(and, 'Carol');

        and('Alice does not receive her own message as a new message', () => {
            expect(pushedTo('Alice')).toEqual([]);
        });
    });

    // @wip: the domain has a push notification port (INotifiyer) but nothing wires it yet
    test('A participant is offline', ({ given, and, when, then }) => {
        background(given, and);

        given('Carol is not connected', async () => {
            expect(s.isOnline((await s.user('Carol')).id)).toBe(false);
        });

        aliceSendsIn(when);
        receivesFromAlice(then, 'Bob');

        and(/^Carol gets a push notification with "(.*)"$/, () => {
            throw new Error('Push notifications are not implemented yet');
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

        and('no message is saved', () => {
            expect(s.messageCount()).toBe(s.messageCountBefore);
        });
    });
});

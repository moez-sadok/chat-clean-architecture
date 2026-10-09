import { defineFeature, DefineStepFunction } from "jest-cucumber";
import { beforeEach, expect } from "@jest/globals";
import { ChatScenario, loadChatFeature } from "../steps/chat-scenario";
import { aliceIsAChatMember, aliceIsNotConnected } from "../steps/common-steps";
import { ChatClientMemoryImpl } from "../doubles/ws/chat-client.port.impl";
import { ConnectClientUseCase } from "../../../core/application";
import { IChatClient } from "../../../core/domain";

const feature = loadChatFeature('connect-client');

defineFeature(feature, (test) => {
    const s = new ChatScenario();
    let connectClient: (client: IChatClient) => Promise<boolean>;

    beforeEach(() => {
        s.reset();
        const usecase = new ConnectClientUseCase(s.main.backend.chatServer);
        connectClient = (client) => s.attempt(() => usecase.connectClient(client)) as Promise<boolean>;
    });

    const theConnectionIsAccepted = (then: DefineStepFunction) =>
        then('the connection is accepted', () => {
            expect(s.error).toBeNull();
            expect(s.result).toBe(true);
        });

    test('Connecting with a user id', ({ given, when, then, and }) => {
        aliceIsAChatMember(given, s);
        aliceIsNotConnected(given, s);

        when('Alice connects with her user id', async () => {
            const alice = await s.client('Alice', false);
            await connectClient(alice.ws);
        });

        theConnectionIsAccepted(then);

        and('Alice is online', () => {
            expect(s.isOnline(s.users['Alice'].id)).toBe(true);
        });
    });

    test('Connecting without a user id', ({ given, when, then, and }) => {
        let anonymous: IChatClient;

        aliceIsAChatMember(given, s);

        given('a client that carries no user id', () => {
            anonymous = new ChatClientMemoryImpl(undefined as unknown as number, '');
            s.onlineUsersBefore = s.onlineUserIds();
        });

        when('the client connects to the chat server', async () => {
            await connectClient(anonymous);
        });

        then('the connection is refused', () => {
            expect(s.result).toBe(false);
        });

        and('no user is added to the online users', () => {
            expect(s.onlineUserIds()).toEqual(s.onlineUsersBefore);
        });
    });

    // @wip: the in-memory chat server refuses a second connection, the Socket.IO adapter accepts it
    test('Connecting a second time', ({ given, when, then, and }) => {
        aliceIsAChatMember(given, s);

        given('Alice is already connected from a first client', async () => {
            await s.client('Alice');
            expect(s.isOnline(s.users['Alice'].id)).toBe(true);
        });

        when('Alice connects again from a second client', async () => {
            await connectClient(new ChatClientMemoryImpl(s.users['Alice'].id, 'Alice'));
        });

        theConnectionIsAccepted(then);

        and('Alice keeps receiving her messages on the first client', () => {
            expect(s.chatServer.getConnectedClient(s.users['Alice'].id)).toBe(s.clients['Alice'].ws);
        });
    });
});

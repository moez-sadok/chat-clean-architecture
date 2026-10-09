import { defineFeature, DefineStepFunction } from "jest-cucumber";
import { beforeEach, expect } from "@jest/globals";
import { ChatScenario, loadChatFeature } from "../steps/chat-scenario";
import { aliceIsAChatMember, aliceIsNotConnected } from "../steps/common-steps";
import { DisconnectClientUseCase } from "../../../core/application";

const feature = loadChatFeature('disconnect-client');

defineFeature(feature, (test) => {
    const s = new ChatScenario();
    let disconnect: (name: string) => Promise<boolean>;

    beforeEach(() => {
        s.reset();
        const usecase = new DisconnectClientUseCase(s.main.backend.chatServer);
        disconnect = async (name) => usecase.disconnectClient((await s.user(name)).id);
    });

    const aliceDisconnects = (when: DefineStepFunction, text: string) =>
        when(text, async () => {
            await s.attempt(() => disconnect('Alice'));
        });

    const theDisconnectionIsReportedAsFailed = (then: DefineStepFunction) =>
        then('the disconnection is reported as failed', () => {
            expect(s.error).toBeNull();
            expect(s.result).toBe(false);
        });

    test('Disconnecting while online', ({ given, when, then, and }) => {
        aliceIsAChatMember(given, s);

        given('Alice is connected to the chat server', async () => {
            await s.client('Alice');
            expect(s.isOnline(s.users['Alice'].id)).toBe(true);
        });

        aliceDisconnects(when, 'Alice disconnects');

        then('the disconnection is confirmed', () => {
            expect(s.error).toBeNull();
            expect(s.result).toBe(true);
        });

        and('Alice is offline', () => {
            expect(s.isOnline(s.users['Alice'].id)).toBe(false);
        });
    });

    test('Disconnecting while offline', ({ given, when, then, and }) => {
        aliceIsAChatMember(given, s);
        aliceIsNotConnected(given, s);
        aliceDisconnects(when, 'Alice disconnects');
        theDisconnectionIsReportedAsFailed(then);

        and('the online users are unchanged', () => {
            expect(s.onlineUserIds()).toEqual(s.onlineUsersBefore);
        });
    });

    test('Disconnecting twice', ({ given, when, then }) => {
        aliceIsAChatMember(given, s);

        given('Alice was connected and has already disconnected', async () => {
            await s.client('Alice');
            expect(await disconnect('Alice')).toBe(true);
        });

        aliceDisconnects(when, 'Alice disconnects again');
        theDisconnectionIsReportedAsFailed(then);
    });
});

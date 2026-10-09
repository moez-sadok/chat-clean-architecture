import { DefineStepFunction } from "jest-cucumber";
import { expect } from "@jest/globals";
import { ChatScenario } from "./chat-scenario";

// Steps used by several features. jest-cucumber binds steps per scenario, so a feature
// reuses one by calling its definer with the scenario's `given`.

export const aliceIsAChatMember = (given: DefineStepFunction, s: ChatScenario) =>
    given('Alice is a chat member', async () => {
        await s.user('Alice');
    });

export const aliceIsNotConnected = (given: DefineStepFunction, s: ChatScenario) =>
    given('Alice is not connected to the chat server', async () => {
        expect(s.isOnline((await s.user('Alice')).id)).toBe(false);
        s.onlineUsersBefore = s.onlineUserIds();
    });

export const noRoomExistsWithId = (given: DefineStepFunction, s: ChatScenario) =>
    given(/^no room exists with the id (\d+)$/, (roomId: string) => {
        expect(s.main.backend.chatdbMapper.getChatRoomsById(Number(roomId))).toBeNull();
        s.messageCountBefore = s.messageCount();
    });

export const errorMentionsRoom = (then: DefineStepFunction, s: ChatScenario, verb: 'does not exist' | 'was not found') =>
    then(new RegExp(`^an error says the room (\\d+) ${verb}$`), (roomId: string) => {
        expect(s.error).not.toBeNull();
        expect(s.error?.message).toMatch(new RegExp(`\\b${roomId}\\b`));
    });

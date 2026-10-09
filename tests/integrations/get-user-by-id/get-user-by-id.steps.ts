import { defineFeature, DefineStepFunction } from "jest-cucumber";
import { beforeEach, expect } from "@jest/globals";
import { ChatScenario, loadChatFeature } from "../steps/chat-scenario";
import { GetUserByIdClientView, UserOutputData } from "../../../core/application";

const feature = loadChatFeature('get-user-by-id');

defineFeature(feature, (test) => {
    const s = new ChatScenario();

    beforeEach(() => s.reset());

    const theseChatMembers = (given: DefineStepFunction) =>
        given('these chat members:', async (table: { id: string; name: string }[]) => {
            for (const { id, name } of table) {
                const user = await s.user(name);
                // ids are assigned by the database, so the table follows its insertion order
                expect(user.id).toBe(Number(id));
            }
        });

    // "I" is a SPA client created after the members, so it does not take their ids
    const iLookUpTheUser = (when: DefineStepFunction) =>
        when(/^I look up the user (\d+)$/, async (userId: string) => {
            const me = await s.client('Me');
            await s.attempt(() => me.getUserByIdController.handle({ userId: Number(userId) }));
        });

    test('Looking up a known user', ({ given, when, then }) => {
        theseChatMembers(given);
        iLookUpTheUser(when);

        then(/^I get the user with the id (\d+) and the name (\w+)$/, (id: string, name: string) => {
            const user = s.result as UserOutputData;
            expect({ id: user?.id, name: user?.name }).toEqual({ id: Number(id), name });
            const view = s.clients['Me'].getUserByIdView as GetUserByIdClientView;
            expect(view.activeUser).toMatchObject({ id: Number(id), name });
        });
    });

    test('Looking up an unknown user', ({ given, when, then, and }) => {
        theseChatMembers(given);

        given(/^no user exists with the id (\d+)$/, (userId: string) => {
            expect(s.main.backend.chatdbMapper.getUserById(Number(userId))).toBeFalsy();
        });

        iLookUpTheUser(when);

        then('I get no user', () => {
            expect(s.result).toBeNull();
        });

        and('no error is raised', () => {
            expect(s.error).toBeNull();
        });
    });
});

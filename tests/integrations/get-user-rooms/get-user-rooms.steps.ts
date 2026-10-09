import { defineFeature, DefineStepFunction } from "jest-cucumber";
import { beforeEach, expect } from "@jest/globals";
import { ChatScenario, loadChatFeature } from "../steps/chat-scenario";
import { GetRoomsByUserClientView, GetRoomsByUserPresenterSSR, GetRoomsByUserSSRView, GetUserRoomsSSRHttpControllerAdapter } from "../../../core/application";
import { GetRoomsByUserSSRUseCase } from "../../../core/application/usecases/get-rooms-by-user/interactor/getRoomsByUser.usecase.ssr";

const feature = loadChatFeature('get-user-rooms');

defineFeature(feature, (test) => {
    const s = new ChatScenario();

    beforeEach(() => s.reset());

    // the rooms the SPA client of a user displays
    const roomsView = (name: string) => s.clients[name].getRoomsView as GetRoomsByUserClientView;

    const theseChatRooms = (given: DefineStepFunction) =>
        given('these chat rooms and participants:', async (table: { room: string; participants: string }[]) => {
            for (const { room, participants } of table) {
                await s.addRoom(room, participants.split(',').map((p) => p.trim()));
            }
        });

    const listsRooms = (when: DefineStepFunction, name: string, text: string) =>
        when(text, async () => {
            const client = await s.client(name);
            await s.attempt(() => client.getRoomsController.handle({ userId: client.id }));
        });

    test('Listing my rooms', ({ given, when, then, and }) => {
        theseChatRooms(given);
        listsRooms(when, 'Alice', 'Alice lists her rooms');

        then(/^she gets the rooms "(.*)" and "(.*)"$/, (first: string, second: string) => {
            expect(roomsView('Alice').rooms.map((r) => r.name).sort()).toEqual([first, second].sort());
        });

        and('each room gives its id and its name', () => {
            for (const room of roomsView('Alice').rooms) {
                expect(room.roomId).toBe(s.room(room.name).id);
            }
        });

        and(/^the room "(.*)" is not listed$/, (name: string) => {
            expect(roomsView('Alice').rooms.map((r) => r.name)).not.toContain(name);
        });
    });

    test('Listing rooms with no membership', ({ given, when, then }) => {
        theseChatRooms(given);

        given('Dave participates in no room', async () => {
            const dave = await s.user('Dave');
            expect(s.main.backend.chatdbMapper.getChatRoomsByUser(dave.id)).toEqual([]);
        });

        listsRooms(when, 'Dave', 'Dave lists his rooms');

        then('he gets an empty list of rooms', () => {
            expect(s.error).toBeNull();
            expect(roomsView('Dave').rooms).toEqual([]);
        });
    });

    test('Opening the rooms page rendered on the server', ({ given, when, then }) => {
        theseChatRooms(given);

        when('Alice opens her rooms page rendered on the server', async () => {
            const alice = await s.user('Alice');
            const presenter = new GetRoomsByUserPresenterSSR(new GetRoomsByUserSSRView());
            const controller = new GetUserRoomsSSRHttpControllerAdapter(
                new GetRoomsByUserSSRUseCase(s.main.backend.chatdbMapper, presenter), presenter, presenter.view);
            await s.attempt(() => controller.handle({ userId: alice.id }));
        });

        then(/^the page lists the rooms "(.*)" and "(.*)"$/, (first: string, second: string) => {
            const listed = [...(s.result as string).matchAll(/<b>(.*?)<\/b>/g)].map((m) => m[1]);
            expect(listed.sort()).toEqual([first, second].sort());
        });
    });
});

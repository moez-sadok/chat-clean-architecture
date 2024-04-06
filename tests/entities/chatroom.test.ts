import { expect, test } from "@jest/globals";
import { Chatroom, IChatroom, IParticpant, Message, Participant } from "../../libs/chat/entreprise-business-rules/entities/src";

describe('Chatroom Register ...', () => {
    let chatroom: IChatroom;
    beforeEach(() => {
        chatroom = new Chatroom('Anna & Lili', 1);
    });

    test('Register a participant inside chatroom', () => {
        const p1 = new Participant('Anna', 1);
        chatroom.register(p1);
        expect(chatroom.getParticipants()[p1.getUserId()]).toBe(p1);
    })

    test('Re-Register the same participant inside chatroom', () => {
        const p1 = new Participant('Anna', 1);
        chatroom.register(p1);
        expect(() => { chatroom.register(p1) })
            .toThrow('Can not register an existing participant');
    });

});

describe('Chatroom Leave ...', () => {
    let chatroom: IChatroom;
    beforeEach(() => {
        chatroom = new Chatroom('Anna & Lili', 1);
    });

    test('Participant leave a chatroom', () => {
        const p1 = new Participant('Anna', 1);
        chatroom.register(p1);
        chatroom.leave(p1);
        expect(Object.keys(chatroom.getParticipants()).length).toBe(0);
    })

    test('No existing participant try to leave a chatroom', () => {
        const p1 = new Participant('Anna', 1);
        chatroom.register(p1);
        chatroom.leave(p1);
        expect(() => { chatroom.leave(p1) }).toThrow('Can not found participant to leave');
    });

});

describe('Chatroom send and broadcats messages', () => {
    let chatroom: IChatroom;
    let p1 : IParticpant;
    let p2 : IParticpant;
    let p3 : IParticpant;
    beforeEach(() => {
        chatroom = new Chatroom('Girls', 1);
        p1 = new Participant('Lili', 1);
        p2 = new Participant('Dina', 2);
        p3 = new Participant('Lina', 3);

        chatroom.register(p1);
        chatroom.register(p2);
        chatroom.register(p3);
    });

    test('"Lili" as a participant sent a message inside the "Girls" chatroom ', () => {
        p1.send('Hello');
        expect(chatroom.getMessages()[0].getcontent()).toBe('Hello');
        expect(p2.getLastReceivedMessage().getcontent()).toBe('Hello');
        expect(p3.getLastReceivedMessage().getcontent()).toBe('Hello');
    })

    test('"Dina" as a participant sent a message inside the "Girls" chatroom ', () => {
        p2.send('Hi girls');
        expect(chatroom.getMessages()[0].getcontent()).toBe('Hi girls');
        expect(p1.getLastReceivedMessage().getcontent()).toBe('Hi girls');
        expect(p3.getLastReceivedMessage().getcontent()).toBe('Hi girls');
    })

    test('"Lina" as a participant sent a message inside the "Girls" chatroom with broadcast ', () => {
        const msg = new Message('Cc',chatroom,p3);
        chatroom.broadcastMessage(msg,p3);
        expect(chatroom.getMessages()[0].getcontent()).toBe('Cc');
        expect(p1.getLastReceivedMessage().getcontent()).toBe('Cc');
        expect(p2.getLastReceivedMessage().getcontent()).toBe('Cc');
    })

});
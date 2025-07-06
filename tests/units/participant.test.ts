import { expect, test } from "@jest/globals";
import { Chatroom, IParticpant, Participant }  from "../../core/domain/index";

describe('Participant testing', () => {
    let participant: IParticpant;
    beforeEach(() => {
        participant = new Participant('Anna', 1);
    });
    test('No Existing chat room, throw error', () => {
        expect(() => { participant.getchatRoom() }).toThrow('Participant dont have a chatroom');
        expect(() => { participant.send('test message') })
            .toThrow('Can not send a message: participant dont have a chatroom');
    });

    test('Get name', () => {
        expect(participant.getUserName()).toBe('Anna')
    });

    test('Send message', () => {
        const chatroom = new Chatroom('Anna & Lili', 1);
        const secondParticipant = new Participant('Lili', 2);
        chatroom.register(participant);
        chatroom.register(secondParticipant);
        participant.send('Hi');
        expect(chatroom.getMessages()[0].getcontent()).toBe('Hi');
        expect(secondParticipant.getLastReceivedMessage().getcontent()).toBe('Hi');
        expect(secondParticipant.getLastReceivedMessage().getParticipant()).toBe(participant);
    });

});
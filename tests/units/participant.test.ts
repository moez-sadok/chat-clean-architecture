import { expect, test } from "@jest/globals";
import { Chatroom, IParticipant, Participant }  from "../../core/domain";

describe('Participant testing', () => {
    let participant: IParticipant;
    beforeEach(() => {
        participant = new Participant('Anna', 1);
    });
    test('No Existing chat room, throw error', () => {
        expect(() => { participant.getChatRoom() }).toThrow('Participant dont have a chatroom');
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
        expect(chatroom.getMessages()[0].getContent()).toBe('Hi');
        expect(secondParticipant.getLastReceivedMessage().getContent()).toBe('Hi');
        expect(secondParticipant.getLastReceivedMessage().getParticipant()).toBe(participant);
    });

});
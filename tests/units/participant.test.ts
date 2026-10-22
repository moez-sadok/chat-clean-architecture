import { expect, test } from "@jest/globals";
import { Chatroom, IChatClient, INotifier, IParticipant, Participant }  from "../../core/domain";

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

    // R16: an offline participant (no chat client) is told by push notification instead
    describe('Receiving a message', () => {
        const notified: { userId: number, msg: string, description?: string }[] = [];
        const notifier: INotifier = { notify: (userId, msg, description) => { notified.push({ userId, msg, description }); } };
        const received: string[] = [];
        const client: IChatClient = { getId: () => 2, receive: (msg) => { received.push(msg); } };

        beforeEach(() => {
            notified.length = 0;
            received.length = 0;
        });

        const sendFromAnnaTo = (receiver: IParticipant) => {
            const chatroom = new Chatroom('General', 1);
            chatroom.register(participant);
            chatroom.register(receiver);
            participant.send('Hi');
        };

        test('online: pushed to its client, no notification', () => {
            sendFromAnnaTo(new Participant('Lili', 2, client, notifier));
            expect(received).toEqual(['Hi']);
            expect(notified).toEqual([]);
        });

        test('offline: notified with the author and the room', () => {
            sendFromAnnaTo(new Participant('Lili', 2, undefined, notifier));
            expect(received).toEqual([]);
            expect(notified).toEqual([{ userId: 2, msg: 'Hi', description: 'Anna in General' }]);
        });

        test('offline without a notifier: the message is only kept', () => {
            const lili = new Participant('Lili', 2);
            sendFromAnnaTo(lili);
            expect(lili.getLastReceivedMessage().getContent()).toBe('Hi');
        });
    });

});
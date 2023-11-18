import { expect, test } from "@jest/globals";
import { Participant } from "../../libs/chat/entreprise-business-rules/entities/src";


 test('No Existing chat room, throw error', () => {
    const participant = new Participant('Anna', 1);

    expect(() => {participant.getchatRoom()})
                        .toThrow('Participant dont have a chatroom');
    
    expect(() => {participant.send('test message')})
                        .toThrow('Can not send a message: participant dont have a chatroom');
 });


test('Get participant name', () => {
    const participant = new Participant('Anna', 1);
    expect(participant.getUserName()).toBe('Anna')
});
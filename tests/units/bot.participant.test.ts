import { expect } from "@jest/globals";
// import { BotParticipant, Chatroom, IParticpant, Participant } from "@cca/core-entities";
import { BotParticipant, Chatroom, IParticpant, Participant } from "../../core/domain/index";
describe('Bot participant testing', () => {
    let bot: IParticpant;
    beforeEach(() => {
        bot = new BotParticipant('Bot', 1);
    });
    it('Send message async', async () => {
        const chatroom = new Chatroom('Lili & Bot', 1);
        const participant = new Participant('Lili', 2);
        chatroom.register(bot);
        chatroom.register(participant);
        participant.send('Hi');

        expect(chatroom.getMessages()[0].getcontent()).toBe('Hi');
        expect(bot.getLastReceivedMessage().getcontent()).toBe('Hi');
        //bot response testing
        await new Promise((r) => setTimeout(r, 100));
        expect(participant.getLastReceivedMessage().getParticipant()).toBe(bot);
        expect(chatroom.getMessages()[1].getcontent()).toBe('Hello Lili, Who i can help you?');
    });
});
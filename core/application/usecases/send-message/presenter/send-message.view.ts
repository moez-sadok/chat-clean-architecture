import { SendMessageOutputData } from "../send-message.response";

// What the UI presenter drives: show the message the author just sent.
// Any view with this method fits, e.g. the room's message list (see the Angular pages' providers),
// so the author sees their message where the room's messages are, without send-message knowing it.
export interface ISendMessageView {
  display(message: SendMessageOutputData): void;
}

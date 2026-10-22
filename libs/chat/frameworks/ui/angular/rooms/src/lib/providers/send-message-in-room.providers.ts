import { SEND_MESSAGE_VIEW } from "../components/send-message/send-message.main.providers";
import { GET_MESSAGES_BY_ROOM_REACTIVE_VIEW } from "./shared-get-messages.presenter.provider";

// Composition of two use cases, decided by the page: the view send-message presents to is the
// room's message list of get-messages-by-room, so the author sees their message where the
// room's messages are. Neither use case knows the other (the view matches ISendMessageView structurally).
export const sendMessageInRoomProviders = [
  { provide: SEND_MESSAGE_VIEW, useExisting: GET_MESSAGES_BY_ROOM_REACTIVE_VIEW },
];

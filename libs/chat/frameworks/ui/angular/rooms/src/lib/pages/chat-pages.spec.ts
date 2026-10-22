import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { IGetMessagesByRoomReactiveView } from '@cca/core-features';
import { ChatPageComponent } from './web/chat-page/chat-page.component';
import { MobileChatMessagePageComponent } from './mobile/mobile-chat-message-page/mobile-chat-message-page.component';
import { SendMessageComponent } from '../components/send-message/send-message.component';
import { CHAT_SERVER_CONTROLLER_PROVIDER } from '../providers/chat-page.main.providers';
import { GET_MESSAGES_BY_ROOM_REACTIVE_VIEW } from '../providers/shared-get-messages.presenter.provider';

// The pages compose two use cases: a message sent with send-message must show up in the
// get-messages-by-room list of the open room. The API is answered by a fetch stub and the
// WebSocket controller is replaced, so nothing leaves the test.
const ROOM_ID = 3;
const API: Record<string, unknown> = {
  'api/chat-user/1': { id: 1, name: 'Alice' },
  'api/chat-user-rooms/1': [{ roomId: ROOM_ID, roomName: 'General' }],
  [`api/chat-room-messages/${ROOM_ID}`]: { messages: [], roomName: 'General', roomId: ROOM_ID },
  'api/send-message': { authorName: 'Alice', message: 'Hello team', chatRoomId: ROOM_ID, authorId: 1 },
};

const flush = () => new Promise((resolve) => setTimeout(resolve));

describe.each<[string, Type<unknown>]>([
  ['web chat page', ChatPageComponent],
  ['mobile message page', MobileChatMessagePageComponent],
])('%s', (_name, page) => {

  beforeEach(() => {
    global.fetch = jest.fn((url: string) =>
      Promise.resolve({ json: () => Promise.resolve(API[url]) })) as unknown as typeof fetch;
    const params = convertToParamMap({ userId: '1', roomId: String(ROOM_ID) });
    TestBed.configureTestingModule({
      imports: [page],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { paramMap: of(params), snapshot: { paramMap: params } } },
      ],
    });
    TestBed.overrideProvider(CHAT_SERVER_CONTROLLER_PROVIDER, {
      useValue: { connectClient: () => Promise.resolve(true), disconnectClient: () => Promise.resolve(true) },
    });
  });

  it('shows a sent message in the open room', async () => {
    const fixture = TestBed.createComponent(page);
    fixture.detectChanges();
    await flush();

    const sendMessage = fixture.debugElement.query(By.directive(SendMessageComponent)).componentInstance as SendMessageComponent;
    await sendMessage.send('Hello team');

    const roomView = fixture.debugElement.injector.get<IGetMessagesByRoomReactiveView>(GET_MESSAGES_BY_ROOM_REACTIVE_VIEW);
    expect(roomView.getViewModel().messages).toEqual([{ content: 'Hello team', participantName: 'Alice', roomId: ROOM_ID }]);
  });
});

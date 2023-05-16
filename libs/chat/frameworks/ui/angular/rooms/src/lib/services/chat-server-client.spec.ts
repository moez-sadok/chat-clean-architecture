import { chatServerClient } from './chat-server-client';

describe('chatServerClient', () => {
  it('should work', () => {
    expect(chatServerClient()).toEqual('chat-server-client');
  });
});

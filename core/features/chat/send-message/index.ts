import { IChatRepository } from '@cca/core-repositories';
import { SendMessageFeature } from './send-message.feature';
import { ISendMessagePresenterOutput } from './sendMessage.presenter.output';
import { IChatServerPort } from 'core/gateways/network/chat-server.port';
import { SendMessagePerfFeature } from './send-message.feature.perf';

export * from './sendMessage.presenter.output';
export * from './sendMessage.controller.input';
export * from './send-message.feature';
export * from './send-message.feature.perf';

export const SEND_MESSAGE_Feature = 'SEND_MESSAGE_Feature';
export const SEND_MESSAGE_Presenter = 'SEND_MESSAGE_Presenter';

export const sendMessageFeatureFactory = (
     chatRepository: IChatRepository,
     presenter: ISendMessagePresenterOutput,
     chatServer: IChatServerPort
) => {
     // return new SendMessageFeature(chatRepository, presenter, chatServer);
     return new SendMessagePerfFeature(chatRepository, presenter, chatServer);
};

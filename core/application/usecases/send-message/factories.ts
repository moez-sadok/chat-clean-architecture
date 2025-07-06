// import { SendMessageFeature } from './send-message.feature';
import { ISendMessagePresenterOutput } from './interactor/sendMessage.presenter.output';
import { SendMessagePerfFeature } from './interactor/send-message.feature.perf';
import { IChatRepository } from '../../ports/chat-repository';
import { IChatServerPort } from '../../ports/chat-server.port';
import { SendMessagePresenterUi } from './presenter/sendMessage.presenter.ui';
import { SendMessageApiHttpControllerAdapter } from './controller/http/sendMessage.api.http.controller.adapter';
import { SendMessageAPIHttpControllerClientAdapter } from './controller/http/sendMessage.api.http.controller.client.adapter';
import { ISendMessageInput } from './interactor/sendMessage.controller.input';
import { ISendMessageView } from './presenter/sendMessage.view';

export const SEND_MESSAGE_Feature = 'SEND_MESSAGE_Feature';
export const SEND_MESSAGE_PresenterApi = 'SEND_MESSAGE_PresenterApi';
export const SEND_MESSAGEApiServerControllerAdapter = 'SEND_MESSAGEApiServerControllerAdapter';


export const sendMessageFeatureFactory = (
     chatRepository: IChatRepository,
     presenter: ISendMessagePresenterOutput,
     chatServer: IChatServerPort
) => {
     // return new SendMessageFeature(chatRepository, presenter, chatServer);
     return new SendMessagePerfFeature(chatRepository, presenter, chatServer);
};

// presenter ui
export const sendMessagePresenterUiFactory = (view: ISendMessageView) => {
    return new SendMessagePresenterUi(view);
};
// controller api adapter 
export const sendMessageAPIControllerAdapter = (usecase: ISendMessageInput,presenter: ISendMessagePresenterOutput) => {
    return new SendMessageApiHttpControllerAdapter(usecase,presenter);
};
// controller client adapter 
export const sendMessageAPIClientControllerAdapter = (presenter: ISendMessagePresenterOutput) => {
    return new SendMessageAPIHttpControllerClientAdapter(presenter);
};

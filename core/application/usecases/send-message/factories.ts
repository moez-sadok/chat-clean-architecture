import { ISendMessagePresenterOutput } from './send-message.output';
import { SendMessageUseCase } from './send-message.usecase';
import { ISendMessageRepository } from './repositories/send-message.repository';
import { IChatServerPort } from '../../ports/chat-server.port';
import { SendMessagePresenterUi } from './presenter/send-message.presenter.ui';
import { SendMessageApiHttpControllerAdapter } from './controller/send-message.http.controller';
import { SendMessageAPIHttpControllerClientAdapter } from './controller/send-message.http.client.controller';
import { ISendMessageInput } from './send-message.input';
import { ISendMessageView } from './presenter/send-message.view';

export const SEND_MESSAGE_USECASE = 'SEND_MESSAGE_USECASE';
export const SEND_MESSAGE_PRESENTER_API = 'SEND_MESSAGE_PRESENTER_API';
export const SEND_MESSAGE_HTTP_CONTROLLER = 'SEND_MESSAGE_HTTP_CONTROLLER';


export const sendMessageFeatureFactory = (
     chatRepository: ISendMessageRepository,
     presenter: ISendMessagePresenterOutput,
     chatServer: IChatServerPort
) => {
     return new SendMessageUseCase(chatRepository, presenter, chatServer);
};

// presenter ui
export const sendMessagePresenterUiFactory = (view: ISendMessageView) => {
    return new SendMessagePresenterUi(view);
};
// controller api adapter 
export const sendMessageAPIControllerAdapter = (usecase: ISendMessageInput) => {
    return new SendMessageApiHttpControllerAdapter(usecase);
};
// controller client adapter 
export const sendMessageAPIClientControllerAdapter = (presenter: ISendMessagePresenterOutput) => {
    return new SendMessageAPIHttpControllerClientAdapter(presenter);
};

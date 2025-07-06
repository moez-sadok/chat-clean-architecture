import { IChatRepository } from '../../ports/chat-repository';
import { GetRoomMessagesApiHttpControllerAdapter } from './controller/http/getMessagesByRoom.api.http.controller.adapter';
import { GetRoomMessagesAPIHttpControllerClientAdapter } from './controller/http/getMessagesByRoom.api.http.controller.client.adapter';
import { IGetMessagesByRoomInput } from './interactor/getMessagesByRoom.controller.input';
import { GetMessagesByRoomFeature } from './interactor/getMessagesByRoom.feature';
import { IGetMessagesByRoomPresenterOutput } from './interactor/getMessagesByRoom.presenter.output';
import { GetMessagesByRoomPresenterUi } from './presenter/getMessagesByRoom.presenter.ui';
import { IGetMessagesByRoomView } from './presenter/getMessagesByRoom.view';
//
export * from './interactor/getMessagesByRoom.presenter.output';
export * from './interactor/getMessagesByRoom.feature';
export * from './interactor/getMessagesByRoom.controller.input';

export const GET_MESSAGES_ByRoomFeature = 'GET_MESSAGES_ByRoomFeature';
export const GET_MESSAGES_ByRoomPresenterApi = 'GET_MESSAGES_ByRoomPresenterApi';
export const GET_MESSAGES_ByRoomApiServerControllerAdapter = 'GET_MESSAGES_ByRoomApiServerControllerAdapter';

export const getMessagesByRoomFeatureFactory = (
  chatRepository: IChatRepository,
  presenter: IGetMessagesByRoomPresenterOutput
) => { return new GetMessagesByRoomFeature(chatRepository, presenter);};

// presenter ui
export const getMessagesByRoomPresenterUiFactory = (view: IGetMessagesByRoomView) => {
    return new GetMessagesByRoomPresenterUi(view);
};
// controller api adapter 
export const getMessagesByRoomAPIControllerAdapter = (usecase: IGetMessagesByRoomInput,presenter: IGetMessagesByRoomPresenterOutput) => {
    return new GetRoomMessagesApiHttpControllerAdapter(usecase,presenter);
};
// controller client adapter 
export const getMessagesByRoomAPIClientControllerAdapter = (presenter: IGetMessagesByRoomPresenterOutput) => {
    return new GetRoomMessagesAPIHttpControllerClientAdapter(presenter);
};

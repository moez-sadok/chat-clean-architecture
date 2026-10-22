import { IChatRepository } from '../../ports/chat-repository';
import { GetRoomMessagesApiHttpControllerAdapter } from './controller/get-messages-by-room.http.controller';
import { GetRoomMessagesAPIHttpControllerClientAdapter } from './controller/get-messages-by-room.http.client.controller';
import { IGetMessagesByRoomInput } from './get-messages-by-room.input';
import { GetMessagesByRoomUseCase } from './get-messages-by-room.usecase';

import { IGetMessagesByRoomPresenterOutput } from './get-messages-by-room.output';
import { GetMessagesByRoomPresenterUi } from './presenter/get-messages-by-room.presenter.ui';
import { IGetMessagesByRoomView } from './presenter/get-messages-by-room.view';

export const GET_MESSAGES_BY_ROOM_USECASE = 'GET_MESSAGES_BY_ROOM_USECASE';
export const GET_MESSAGES_BY_ROOM_PRESENTER_API = 'GET_MESSAGES_BY_ROOM_PRESENTER_API';
export const GET_MESSAGES_BY_ROOM_HTTP_CONTROLLER = 'GET_MESSAGES_BY_ROOM_HTTP_CONTROLLER';

export const getMessagesByRoomFeatureFactory = (
  chatRepository: IChatRepository,
  presenter: IGetMessagesByRoomPresenterOutput
) => { return new GetMessagesByRoomUseCase(chatRepository, presenter);};

// presenter ui
export const getMessagesByRoomPresenterUiFactory = (view: IGetMessagesByRoomView) => {
    return new GetMessagesByRoomPresenterUi(view);
};
// controller api adapter 
export const getMessagesByRoomAPIControllerAdapter = (usecase: IGetMessagesByRoomInput) => {
    return new GetRoomMessagesApiHttpControllerAdapter(usecase);
};
// controller client adapter 
export const getMessagesByRoomAPIClientControllerAdapter = (presenter: IGetMessagesByRoomPresenterOutput) => {
    return new GetRoomMessagesAPIHttpControllerClientAdapter(presenter);
};

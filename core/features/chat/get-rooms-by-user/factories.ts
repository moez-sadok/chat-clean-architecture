import { IChatRepository } from '../../../repositories/chat-repository';
import { IGetRoomsByUserPresenterOutput } from './controller/getRoomsByUser.presenter.output';
import { GetUserRoomsClientHttpController } from './controller/http/getRoomsByUser.client.controller.http';
import { GetRoomsByUserFeature } from './interactor/getRoomsByUser.feature';
import { GetRoomsByUserPresenterUi } from './presenter/getRoomsByUser.presenter.ui';
import { IGetRoomsByUserView } from './presenter/getRoomsByUser.view';

export const GET_ROOMS_ByUserFeature = 'GET_ROOMS_ByUserFeature';
export const GET_ROOMS_ByUserPresenter = 'GET_ROOMS_ByUserPresenter';

export const getRoomsByUserFeatureFactory = (
  chatRepository: IChatRepository
) => { 
  return new GetRoomsByUserFeature(chatRepository);
};

// presenter
export const getRoomsByUserPresenterUiFactory = (view: IGetRoomsByUserView) => {
    return new GetRoomsByUserPresenterUi(view);
};

// controller
export const getRoomsByUserClientHttpControllerFactory = (presenter: IGetRoomsByUserPresenterOutput) => {
    return new GetUserRoomsClientHttpController(presenter,'');
};

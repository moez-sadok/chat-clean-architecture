import { IChatRepository } from '../../ports/chat-repository';
import { IGetRoomsByUserPresenter, IGetRoomsByUserSSRPresenter } from './controller/getRoomsByUser.presenter';
import { GetUserRoomsApiHttpControllerAdapter } from './controller/http/getRoomsByUser.api.http.controller.adapter';
import { GetUserRoomsSSRHttpControllerAdapter } from './controller/http/getRoomsByUser.ssr.http.controller.adapter';
import { IGetRoomsByUserRequester } from './interactor/getRoomsByUser.requester';
import { GetRoomsByUserUseCase } from './interactor/getRoomsByUser.usecase';
import { GetRoomsByUserPresenterSSR } from './presenter/getRoomsByUser.presenter.ssr';
import { GetRoomsByUserPresenterUi } from './presenter/getRoomsByUser.presenter.ui';
import { IGetRoomsByUserSSRView, IGetRoomsByUserView } from './presenter/getRoomsByUser.view';
import { GetUserRoomsAPIHttpControllerClientAdapter } from './controller/http/getRoomsByUser.api.http.controller.client.adapter';

export const GET_ROOMS_ByUserFeature = 'GET_ROOMS_ByUserFeature';
export const GET_ROOMS_ByUserPresenterApi = 'GET_ROOMS_ByUserPresenterApi';
export const GET_ROOMS_ByUserApiServerControllerAdapter = 'GET_ROOMS_ByUserApiServerControllerAdapter';

export const GET_ROOMS_ByUserSSRFeature = 'GET_ROOMS_ByUserSSRFeature';
export const GET_ROOMS_ByUserSSRControllerAdapter = 'GET_ROOMS_ByUserSSRControllerAdapter';
export const GET_ROOMS_ByUserSSRView = 'GET_ROOMS_ByUserSSRView';
export const GET_ROOMS_ByUserSSRPresenter = 'GET_ROOMS_ByUserSSRPresenter';

//feature: one use case, wired to the API presenter or to the SSR one
export const getRoomsByUserFeatureFactory = (
  chatRepository: IChatRepository,
  presenter: IGetRoomsByUserPresenter
) => {
  return new GetRoomsByUserUseCase(chatRepository, presenter);
};
// presenter
export const getRoomsByUserPresenterUiFactory = (view: IGetRoomsByUserView) => {
    return new GetRoomsByUserPresenterUi(view);
};
// presenter ssr
export const getRoomsByUserPresenterSSRFactory = (view: IGetRoomsByUserSSRView) => {
    return new GetRoomsByUserPresenterSSR(view);
};
// controller api adapter 
export const getRoomsByUserAPIControllerAdapter = (usecase: IGetRoomsByUserRequester) => {
    return new GetUserRoomsApiHttpControllerAdapter(usecase);
};
// controller client adapter 
export const getRoomsByUserAPIClientControllerAdapter = (presenter: IGetRoomsByUserPresenter) => {
    return new GetUserRoomsAPIHttpControllerClientAdapter(presenter);
};
// controller ssr adapter
export const getRoomsByUserSSRControllerAdapter = (usecase: IGetRoomsByUserRequester,presenter: IGetRoomsByUserSSRPresenter,view: IGetRoomsByUserSSRView) => {
    return new GetUserRoomsSSRHttpControllerAdapter(usecase,presenter,view);
};
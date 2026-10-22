import { IChatRepository } from '../../ports/chat-repository';
import { IGetRoomsByUserPresenter, IGetRoomsByUserSSRPresenter } from './get-rooms-by-user.output';
import { GetUserRoomsApiHttpControllerAdapter } from './controller/get-rooms-by-user.http.controller';
import { GetUserRoomsSSRHttpControllerAdapter } from './controller/get-rooms-by-user.ssr.controller';
import { IGetRoomsByUserRequester } from './get-rooms-by-user.input';
import { GetRoomsByUserUseCase } from './get-rooms-by-user.usecase';
import { GetRoomsByUserPresenterSSR } from './presenter/get-rooms-by-user.presenter.ssr';
import { GetRoomsByUserPresenterUi } from './presenter/get-rooms-by-user.presenter.ui';
import { IGetRoomsByUserSSRView, IGetRoomsByUserView } from './presenter/get-rooms-by-user.view';
import { GetUserRoomsAPIHttpControllerClientAdapter } from './controller/get-rooms-by-user.http.client.controller';

export const GET_ROOMS_BY_USER_USECASE = 'GET_ROOMS_BY_USER_USECASE';
export const GET_ROOMS_BY_USER_PRESENTER_API = 'GET_ROOMS_BY_USER_PRESENTER_API';
export const GET_ROOMS_BY_USER_HTTP_CONTROLLER = 'GET_ROOMS_BY_USER_HTTP_CONTROLLER';

export const GET_ROOMS_BY_USER_SSR_USECASE = 'GET_ROOMS_BY_USER_SSR_USECASE';
export const GET_ROOMS_BY_USER_SSR_CONTROLLER = 'GET_ROOMS_BY_USER_SSR_CONTROLLER';
export const GET_ROOMS_BY_USER_SSR_VIEW = 'GET_ROOMS_BY_USER_SSR_VIEW';
export const GET_ROOMS_BY_USER_SSR_PRESENTER = 'GET_ROOMS_BY_USER_SSR_PRESENTER';

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
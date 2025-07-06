import { IChatRepository } from '../../ports/chat-repository';
import { GetUserByIdApiHttpControllerAdapter } from './controller/http/getUserById.api.http.controller.adapter';
import { GetUserByIdAPIHttpControllerClientAdapter } from './controller/http/getUserById.api.http.controller.client.adapter';
import { IGetUserByIdInput } from './interactor/getUserById.controller.input';
import { GetUserByIdFeature } from './interactor/getUserById.feature';
import { IGetUserByIdPresenterOutput } from './interactor/getUserById.presenter.output';
import { UserByIdPresenterUi } from './presenter/getUserById.presenter.ui';
import { IGetUserByIdView } from './presenter/getUserById.view';
//
export * from './interactor/getUserById.controller.input';
export * from './interactor/getUserById.presenter.output';
export * from './interactor/getUserById.feature';

export const GET_USER_ByIdFeature = 'GET_USER_ByIdFeature';
export const GET_USER_ByIdPresenterApi = 'GET_USER_ByIdPresenterApi';
export const GET_USER_ByIdApiServerControllerAdapter = 'GET_USER_ByIdApiServerControllerAdapter';

export const getUserByIdFeatureFactory = (
  chatRepository: IChatRepository,
  presenter: IGetUserByIdPresenterOutput
) => { return new GetUserByIdFeature(chatRepository, presenter);};

// presenter ui
export const getUserByIdPresenterUiFactory = (view: IGetUserByIdView) => {
    return new UserByIdPresenterUi(view);
};
// controller api adapter 
export const getUserByIdAPIControllerAdapter = (usecase: IGetUserByIdInput,presenter: IGetUserByIdPresenterOutput) => {
    return new GetUserByIdApiHttpControllerAdapter(usecase,presenter);
};
// controller client adapter 
export const getUserByIdAPIClientControllerAdapter = (presenter: IGetUserByIdPresenterOutput) => {
    return new GetUserByIdAPIHttpControllerClientAdapter(presenter);
};

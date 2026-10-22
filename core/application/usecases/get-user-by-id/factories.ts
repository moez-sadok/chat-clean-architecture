import { IChatRepository } from '../../ports/chat-repository';
import { GetUserByIdApiHttpControllerAdapter } from './controller/get-user-by-id.http.controller';
import { GetUserByIdAPIHttpControllerClientAdapter } from './controller/get-user-by-id.http.client.controller';
import { IGetUserByIdInput } from './get-user-by-id.input';
import { GetUserByIdUseCase } from './get-user-by-id.usecase';
import { IGetUserByIdPresenterOutput } from './get-user-by-id.output';
import { UserByIdPresenterUi } from './presenter/get-user-by-id.presenter.ui';
import { IGetUserByIdView } from './presenter/get-user-by-id.view';

export const GET_USER_BY_ID_USECASE = 'GET_USER_BY_ID_USECASE';
export const GET_USER_BY_ID_PRESENTER_API = 'GET_USER_BY_ID_PRESENTER_API';
export const GET_USER_BY_ID_HTTP_CONTROLLER = 'GET_USER_BY_ID_HTTP_CONTROLLER';

export const getUserByIdFeatureFactory = (
  chatRepository: IChatRepository,
  presenter: IGetUserByIdPresenterOutput
) => { return new GetUserByIdUseCase(chatRepository, presenter);};

// presenter ui
export const getUserByIdPresenterUiFactory = (view: IGetUserByIdView) => {
    return new UserByIdPresenterUi(view);
};
// controller api adapter 
export const getUserByIdAPIControllerAdapter = (usecase: IGetUserByIdInput) => {
    return new GetUserByIdApiHttpControllerAdapter(usecase);
};
// controller client adapter 
export const getUserByIdAPIClientControllerAdapter = (presenter: IGetUserByIdPresenterOutput) => {
    return new GetUserByIdAPIHttpControllerClientAdapter(presenter);
};

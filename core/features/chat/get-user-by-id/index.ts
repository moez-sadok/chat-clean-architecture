import { IChatRepository } from '../../../repositories/chat-repository';
import { GetUserByIdFeature } from './getUserById.feature';
import { IGetUserByIdPresenterOutput } from './getUserById.presenter.output';
//
export * from './getUserById.controller.input';
export * from './getUserById.presenter.output';
export * from './getUserById.feature';

export const GET_USER_ByIdFeature = 'GET_USER_ByIdFeature';
export const GET_USER_ByIdPresenter = 'GET_USER_ByIdPresenter';

export const getUserByIdFeatureFactory = (
  chatRepository: IChatRepository,
  presenter: IGetUserByIdPresenterOutput
) => { return new GetUserByIdFeature(chatRepository, presenter);};

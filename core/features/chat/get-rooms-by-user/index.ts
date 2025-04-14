import { IChatRepository } from '../../../repositories/chat-repository';
import { GetRoomsByUserFeature } from './getRoomsByUser.feature';
import { IGetRoomsByUserPresenterOutput } from './getRoomsByUser.presenter.output';
//
export * from './getRoomsByUser.controller.input';
export * from './getRoomsByUser.presenter.output';
export * from './getRoomsByUser.feature';

export const GET_ROOMS_ByUserFeature = 'GET_ROOMS_ByUserFeature';
export const GET_ROOMS_ByUserPresenter = 'GET_ROOMS_ByUserPresenter';

export const getRoomsByUserFeatureFactory = (
  chatRepository: IChatRepository,
  presenter: IGetRoomsByUserPresenterOutput
) => { return new GetRoomsByUserFeature(chatRepository, presenter);};

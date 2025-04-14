import { IChatRepository } from '../../../repositories/chat-repository';
import { GetMessagesByRoomFeature } from './getMessagesByRoom.feature';
import { IGetMessagesByRoomPresenterOutput } from './getMessagesByRoom.presenter.output';
//
export * from './getMessagesByRoom.presenter.output';
export * from './getMessagesByRoom.feature';
export * from './getMessagesByRoom.controller.input';

export const GET_MESSAGES_ByRoomFeature = 'GET_MESSAGES_ByRoomFeature';
export const GET_MESSAGES_ByRoomPresenter = 'GET_MESSAGES_ByRoomPresenter';

export const getMessagesByRoomFeatureFactory = (
  chatRepository: IChatRepository,
  presenter: IGetMessagesByRoomPresenterOutput
) => { return new GetMessagesByRoomFeature(chatRepository, presenter);};

import { IChatRepository } from '../../components/chat-repository/repository-gateway';
import { IGetUserByIdInput } from './getUserById.controller.input';
import { UserOutputData } from '../../dtos/output.chat.data';
import { IGetUserByIdPresenterOutput } from './getUserById.presenter.output';

export class GetUserByIdFeature implements IGetUserByIdInput {

  constructor(
    private chatRepository: IChatRepository,
    private presenter: IGetUserByIdPresenterOutput
  ) { }

  getUser(userId: number): Promise<UserOutputData | null> {
    const existUser = this.chatRepository.getUserById(userId);
    return new Promise((resolve) => {
      if (existUser) resolve(this.presenter.selectedUser(existUser));
    });
  }

}

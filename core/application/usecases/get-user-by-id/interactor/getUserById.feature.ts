
import { IChatRepository } from '../../../ports/chat-repository';
import { IGetUserByIdInput } from './getUserById.controller.input';
import { IGetUserByIdPresenterOutput } from './getUserById.presenter.output';
import { UserOutputData } from './getUserById.response.data';

export class GetUserByIdFeature implements IGetUserByIdInput {

  constructor(
    private chatRepository: IChatRepository,
    private presenter: IGetUserByIdPresenterOutput
  ) { }

  getUser(userId: number): Promise<UserOutputData | null> {
    const existUser = this.chatRepository.getUserById(userId);
   // if(!existUser) existUser = this.chatRepository.addUser({ name: 'autogen', id : userId})
    return new Promise((resolve) => {
      if (existUser) resolve(this.presenter.selectedUser(existUser));
      else resolve(null)
    });
  }

}

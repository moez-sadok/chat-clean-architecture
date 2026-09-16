
import { IChatRepository } from '../../../ports/chat-repository';
import { IGetUserByIdInput } from './getUserById.controller.input';
import { IGetUserByIdPresenterOutput } from './getUserById.presenter.output';
import { UserOutputData } from './getUserById.response.data';

export class GetUserByIdUseCase implements IGetUserByIdInput {

  constructor(
    private chatRepository: IChatRepository,
    private presenter: IGetUserByIdPresenterOutput
  ) { }

  async getUser(userId: number): Promise<UserOutputData | null> {
    const existUser = await this.chatRepository.getUserById(userId);
   // if(!existUser) existUser = await this.chatRepository.addUser({ name: 'autogen', id : userId})
    if (existUser) return this.presenter.selectedUser(existUser);
    return null;
  }

}

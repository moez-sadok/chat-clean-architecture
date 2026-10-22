
import { IChatRepository } from '../../ports/chat-repository';
import { IGetUserByIdInput } from './get-user-by-id.input';
import { IGetUserByIdPresenterOutput } from './get-user-by-id.output';
import { UserOutputData } from './get-user-by-id.response';

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

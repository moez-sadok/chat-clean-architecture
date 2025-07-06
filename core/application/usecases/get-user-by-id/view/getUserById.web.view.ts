
import { IGetUserByIdView } from "../presenter/getUserById.view";
import { GetUserByIdViewModelDto } from "../presenter/getUserById.view.model";

export class GetUserByIdClientView implements IGetUserByIdView {

   activeUser: GetUserByIdViewModelDto | null = null;
  
   setActiveUser(user: GetUserByIdViewModelDto | null): void {
     this.activeUser = user
   }
 
}
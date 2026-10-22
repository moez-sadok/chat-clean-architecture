
import { IGetUserByIdView } from "../presenter/get-user-by-id.view";
import { GetUserByIdViewModelDto } from "../presenter/get-user-by-id.view.model";

export class GetUserByIdClientView implements IGetUserByIdView {

   activeUser: GetUserByIdViewModelDto | null = null;
  
   setActiveUser(user: GetUserByIdViewModelDto | null): void {
     this.activeUser = user
   }
 
}
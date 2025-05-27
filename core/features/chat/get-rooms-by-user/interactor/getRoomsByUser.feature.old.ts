// import { IChatRepository } from "../../../../repositories/chat-repository";
// import { IGetRoomsByUserRequester } from "./getRoomsByUser.requester";
// import { GetRoomsByUserRequestData } from "./getRoomsByUser.request.data";
// import { GetRoomsByUserResponseData } from "./getRoomsByUser.response.data";
// import { IGetRoomsByUserPresenterOutput } from "../controller/getRoomsByUser.presenter.output";

// export class GetRoomsByUserFeature implements IGetRoomsByUserRequester {

//   constructor(
//     private chatRepository: IChatRepository,
//     private presenter: IGetRoomsByUserPresenterOutput
//   ) { }

//   getRoomsByUser(user: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
//     const rooms = this.chatRepository.getChatRoomsByUser(user.userId).map((r) => {
//       return {
//         roomId: r.id,
//         roomName: r.name
//       } as GetRoomsByUserResponseData;
//     });
//     return new Promise((resolve) => {
//        resolve(this.presenter.selectedRoomsByUser(rooms));
//       resolve(rooms);
//     });
//   }

// }

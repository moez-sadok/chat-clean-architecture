import { IChatroom } from "../../domain/interfaces/chatroom";
import { IChatClient } from "../../domain/ports/chat-client";

//Refactoring ...
export class RoomsCacheManager {

    //TOTO manage limits and service mesh / service discovery
    private openedRoomsCache: Record<number, IChatroom> = {};
    private userRoomsMap: Record<number, number[]> = {}; // { userId, roomIds[] }

    getRoomFromCache(roomId: number): IChatroom {
        return this.openedRoomsCache[roomId];
    }

    setRoomToCache(room: IChatroom): void {
        this.openedRoomsCache[room.getId()] = room;
    }

    setUserIdToMapRoomCache(userId: number, roomId: number): void {
        if (!this.userRoomsMap[userId]) {
            this.userRoomsMap[userId] = [];
        }
        this.userRoomsMap[userId].push(roomId);
    }

    getUserRoomsIdsFromCache(userId: number): number[] {
        return this.userRoomsMap[userId] || [];
    }

    setChatClientToParticipantsOfRoomsCache(client: IChatClient): void {
        const userId = client.getId();
        const roomsId = this.getUserRoomsIdsFromCache(userId);
        for (const roomId of roomsId) {
            const room = this.getRoomFromCache(roomId);
            const participant = Object.values(room.getParticipants()).find((p) => p.getUserId() === userId);
            participant?.setClient(client);
        }
    }

}
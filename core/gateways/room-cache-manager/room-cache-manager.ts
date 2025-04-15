import { ChatroomDto } from "../../dtos/models/chatroom.dto";
import { ParticpantDto } from "../../dtos/models/participant.dto";
import { BotParticipant } from "../../entities/entities-impl/bot.participant";
import { Chatroom } from "../../entities/entities-impl/chat-room.impl";
import { Participant } from "../../entities/entities-impl/participant.impl";
import { IChatroom } from "../../entities/interfaces/chatroom";
import { IParticpant } from "../../entities/interfaces/participant";
import { IChatClient } from "../notifiyer/chat-client.port";

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
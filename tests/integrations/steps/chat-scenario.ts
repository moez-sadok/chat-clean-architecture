import { resolve } from "path";
import { loadFeature } from "jest-cucumber";
import { ClientViewController, MainDouble } from "../doubles/app/main";
import { ChatServerMemoryImpl } from "../doubles/ws/chat-server.memory.impl";
import { DataBaseMemoryEmpty } from "../doubles/db/memory.database.empty";
import { ChatroomDto } from "../../../core/dtos/models/chatroom.dto";
import { UserDto } from "../../../core/dtos/models/user.dto";
import { GetMessagesByRoomClientView } from "../../../core/application";

// Loads a feature of docs/features. Scenarios tagged @wip describe behaviour not built yet:
// they are reported as skipped, and every other scenario must match its steps exactly.
export const loadChatFeature = (name: string) =>
    loadFeature(resolve(__dirname, `../../../docs/features/${name}/${name}-bdd.feature`), { tagFilter: 'not @wip' });

// State of one scenario, on top of the integration MainDouble (client + server wired together).
export class ChatScenario {

    main!: MainDouble;
    users: Record<string, UserDto> = {};
    clients: Record<string, ClientViewController> = {};
    rooms: Record<string, ChatroomDto> = {};

    // outcome of the last When
    result: unknown;
    error: Error | null = null;

    // snapshots taken by a Given, for "unchanged" outcomes
    onlineUsersBefore: number[] = [];
    messageCountBefore = 0;

    // every scenario starts from an empty database: ids start at 1
    reset(): void {
        this.main = new MainDouble(new DataBaseMemoryEmpty());
        this.users = {};
        this.clients = {};
        this.rooms = {};
        this.result = undefined;
        this.error = null;
        this.onlineUsersBefore = [];
        this.messageCountBefore = 0;
    }

    get chatServer(): ChatServerMemoryImpl {
        return this.main.backend.chatServer as ChatServerMemoryImpl;
    }

    async user(name: string): Promise<UserDto> {
        if (!this.users[name]) this.users[name] = await this.main.backend.chatdbMapper.addUser({ id: -1, name });
        return this.users[name];
    }

    // the user's SPA client, connected to the chat server unless told otherwise
    async client(name: string, connect = true): Promise<ClientViewController> {
        if (!this.clients[name]) this.clients[name] = await this.main.makeClientFor(await this.user(name), connect);
        return this.clients[name];
    }

    room(name: string): ChatroomDto {
        const room = this.rooms[name];
        if (!room) throw new Error(`The room "${name}" was not declared by the scenario`);
        return room;
    }

    async addRoom(name: string, participants: string[]): Promise<ChatroomDto> {
        const room = await this.main.addNewRoom(name);
        for (const participant of participants) {
            await this.main.addClientToRoom((await this.user(participant)).id, room.id);
        }
        this.rooms[name] = room;
        return room;
    }

    // as in the SPA: list my rooms, then open one, which is the room new messages are pushed to
    async openRoom(name: string, roomName: string): Promise<GetMessagesByRoomClientView> {
        const client = await this.client(name);
        await client.getRoomsController.handle({ userId: client.id });
        await client.getMessagesController.handle({ roomId: this.room(roomName).id });
        return client.getMessagesView as GetMessagesByRoomClientView;
    }

    isOnline(userId: number): boolean {
        return this.chatServer.getConnectedClient(userId) !== undefined;
    }

    onlineUserIds(): number[] {
        return Object.keys(this.chatServer.connectetdUsers).map(Number);
    }

    messageCount(): number {
        const repository = this.main.backend.chatdbMapper;
        return repository.getChatRooms()
            .reduce((count, room) => count + repository.getMessagesByRoom(room.id).length, 0);
    }

    // use cases throw synchronously as well as reject, so both are caught here
    async attempt<T>(action: () => Promise<T>): Promise<T | undefined> {
        this.result = undefined;
        this.error = null;
        try {
            this.result = await action();
            return this.result as T;
        } catch (error) {
            this.error = error as Error;
            return undefined;
        }
    }
}

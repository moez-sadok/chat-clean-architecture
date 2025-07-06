export interface MessageTable {
  id: number;
  participantId: number;
  roomId: number;
  content: string;
  created_at?: Date;
}

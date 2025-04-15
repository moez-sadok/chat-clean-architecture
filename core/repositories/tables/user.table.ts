export interface UserTable {
  id: number;
  name: string;
  email?: string;
  //perf
  participantsIds?: number[];
}

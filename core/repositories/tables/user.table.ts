export interface UserTable {
  id: number;
  name: string;
  email?: string;
  //perf
  // participantsIds?: number[];
  // participantsIds?: Set<number>
  participantsIds?: Record<number,number>;
}

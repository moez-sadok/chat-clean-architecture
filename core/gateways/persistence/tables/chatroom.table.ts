export interface ChatroomTable {
  id: number;
  name: string;
  //perf optmisation
  participantsIds?: number[];
}

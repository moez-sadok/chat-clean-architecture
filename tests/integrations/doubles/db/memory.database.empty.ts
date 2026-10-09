import { DataBaseMemoryPerfImpl } from "../../../../libs/chat/frameworks/db/in-memory-db/src";

// The in-memory database without its demo dataset: ids start at 1,
// so the users and rooms a scenario declares get predictable ids.
export class DataBaseMemoryEmpty extends DataBaseMemoryPerfImpl {
    override createDb() { }
}

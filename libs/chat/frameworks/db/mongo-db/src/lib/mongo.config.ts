export interface MongoDatabaseConfig {
  /** Connection string, e.g. mongodb://localhost:27017 or a mongodb+srv:// URI. */
  url: string;
  /** Database name. */
  dbName: string;
  /**
   * Inserts the demo dataset when the database is still empty.
   * Off by default: a production database is not seeded with sample users.
   */
  seed: boolean;
}

export const MONGO_COLLECTIONS = {
  users: 'users',
  rooms: 'rooms',
  participants: 'participants',
  messages: 'messages',
  counters: 'counters'
} as const;

/** Reads the configuration from the environment (MONGO_URL, MONGO_DB, MONGO_SEED). */
export const mongoConfigFromEnv = (env: Record<string, string | undefined> = process.env): MongoDatabaseConfig => ({
  url: env['MONGO_URL'] ?? 'mongodb://localhost:27017',
  dbName: env['MONGO_DB'] ?? 'pchat',
  seed: env['MONGO_SEED'] === 'true'
});

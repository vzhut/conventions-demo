import { AppError, NotFoundError } from "../errors.js";
import { logger } from "../utils/logger.js";

export interface UserRecord {
  userId: string;
  displayName: string;
  emailAddress: string;
}

const users = new Map<string, UserRecord>([
  ["u1", { userId: "u1", displayName: "Ada Lovelace", emailAddress: "ada@example.com" }],
]);

/** Every lookup is wrapped: a miss becomes a typed AppError, never undefined
 * silently propagating up. */
export async function getUserById(userId: string): Promise<UserRecord> {
  try {
    const found = users.get(userId);
    if (!found) throw new NotFoundError(`User ${userId} not found`);
    return found;
  } catch (err) {
    if (err instanceof AppError) throw err;
    logger.error("getUserById failed", { userId, err: String(err) });
    throw new AppError("user_lookup_failed", "Could not look up user", 500);
  }
}

export async function renameUser(userId: string, displayName: string): Promise<UserRecord> {
  try {
    const record = await getUserById(userId);
    const updated = { ...record, displayName };
    users.set(userId, updated);
    logger.info("user renamed", { userId });
    return updated;
  } catch (err) {
    if (err instanceof AppError) throw err;
    logger.error("renameUser failed", { userId, err: String(err) });
    throw new AppError("user_rename_failed", "Could not rename user", 500);
  }
}

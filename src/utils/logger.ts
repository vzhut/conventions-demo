/**
 * All output goes through this logger, never a bare console.log/error.
 * Keeps the format consistent and gives us one place to swap the sink later.
 */
export const logger = {
  info(message: string, meta?: Record<string, unknown>): void {
    // eslint-disable-next-line no-console -- the ONE sanctioned console call
    console.log(JSON.stringify({ level: "info", message, ...meta }));
  },
  error(message: string, meta?: Record<string, unknown>): void {
    // eslint-disable-next-line no-console -- the ONE sanctioned console call
    console.error(JSON.stringify({ level: "error", message, ...meta }));
  },
};

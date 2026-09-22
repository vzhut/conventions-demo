import { AppError, NotFoundError } from "../errors.js";
import { logger } from "../utils/logger.js";

export interface OrderRecord {
  orderId: string;
  userId: string;
  totalCents: number;
}

const orders = new Map<string, OrderRecord>([
  ["o1", { orderId: "o1", userId: "u1", totalCents: 1999 }],
]);

/** Same shape as userService's lookups: wrapped, typed AppError on failure. */
export async function getOrderById(orderId: string): Promise<OrderRecord> {
  try {
    const found = orders.get(orderId);
    if (!found) throw new NotFoundError(`Order ${orderId} not found`);
    return found;
  } catch (err) {
    if (err instanceof AppError) throw err;
    logger.error("getOrderById failed", { orderId, err: String(err) });
    throw new AppError("order_lookup_failed", "Could not look up order", 500);
  }
}

export async function cancelOrder(orderId: string): Promise<void> {
  try {
    await getOrderById(orderId);
    orders.delete(orderId);
    logger.info("order cancelled", { orderId });
  } catch (err) {
    if (err instanceof AppError) throw err;
    logger.error("cancelOrder failed", { orderId, err: String(err) });
    throw new AppError("order_cancel_failed", "Could not cancel order", 500);
  }
}

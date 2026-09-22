import { getUserById, renameUser } from "./services/userService.js";
import { cancelOrder, getOrderById } from "./services/orderService.js";
import { logger } from "./utils/logger.js";
import { AppError } from "./errors.js";

async function main(): Promise<void> {
  try {
    const user = await getUserById("u1");
    logger.info("loaded user", { userId: user.userId });

    await renameUser("u1", "Ada, Countess of Lovelace");

    const order = await getOrderById("o1");
    logger.info("loaded order", { orderId: order.orderId });

    await cancelOrder("o1");
  } catch (err) {
    if (err instanceof AppError) {
      logger.error(err.message, { code: err.code });
      return;
    }
    throw err;
  }
}

await main();

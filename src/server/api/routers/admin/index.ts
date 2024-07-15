import { router } from "@/server/api/trpc";
import { productRouter } from "./product.router";
import { orderRouter } from "./order.router";

export const adminRouter = router({
  product: productRouter,
  order: orderRouter,
});

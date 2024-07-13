import { router } from "@/server/api/trpc";
import { productRouter } from "./product.router";

export const adminRouter = router({
  product: productRouter,
});

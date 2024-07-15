import { router } from "@/server/api/trpc";
import { productRouter } from "./product.router";
import { checkoutProcedure } from "./checkout.router";
import { cartRouter } from "./cart.router";

export const customerRouter = router({
  product: productRouter,
  checkout: checkoutProcedure,
  cart: cartRouter
});

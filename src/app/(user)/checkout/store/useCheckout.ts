import { create } from "zustand";
import { type z } from "zod";
import { type itemSchema } from "@/server/api/routers/customer/checkout.router";
import { persist, createJSONStorage } from "zustand/middleware";

type CheckoutStore = {
  items: z.infer<typeof itemSchema>[];
  orderId: string | null;
  setItems: (items: z.infer<typeof itemSchema>[]) => void;
  setOrderId: (orderId: string) => void;
  reset: () => void;
};

export const useCheckout = create(
  persist<CheckoutStore>(
    (set) => ({
      orderId: null,
      items: [],
      setItems: (items) => set({ items }),
      setOrderId: (orderId) => set({ orderId }),
      reset: () => set({ items: [], orderId: null }),
    }),
    {
      name: "checkout", // name of the item in the storage (must be unique)
    },
  ),
);

export default useCheckout;

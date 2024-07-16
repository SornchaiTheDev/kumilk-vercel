import { create } from "zustand";
import { type z } from "zod";
import { type itemSchema } from "@/server/api/routers/customer/checkout.router";
import { persist, createJSONStorage } from "zustand/middleware";

type CheckoutStore = {
  email: string | null;
  items: z.infer<typeof itemSchema>[];
  orderId: string | null;
  setItems: (items: z.infer<typeof itemSchema>[]) => void;
  setEmail: (email: string) => void;
  setOrderId: (orderId: string) => void;
  reset: () => void;
};

export const useCheckout = create(
  persist<CheckoutStore>(
    (set) => ({
      email: null,
      orderId: null,
      items: [],
      setItems: (items) => set({ items }),
      setEmail: (email) => set({ email }),
      setOrderId: (orderId) => set({ orderId }),
      reset: () => set({ email: null, items: [], orderId: null }),
    }),
    {
      name: "checkout", // name of the item in the storage (must be unique)
    },
  ),
);

export default useCheckout;

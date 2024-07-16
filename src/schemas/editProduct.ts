import { z } from "zod";
import { addProductSchema, type addProductType } from "./addProduct";

export const editProductSchema = addProductSchema.extend({
  id: z.string(),
  isVisible: z.boolean(),
});

export type editProductType = z.infer<typeof editProductSchema>;

export type ProductType = addProductType | editProductType;


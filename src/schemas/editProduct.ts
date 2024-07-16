import { z } from "zod";
import { addProductSchema, type addProductType } from "./addProduct";

export const editProductSchema = addProductSchema.extend({
  id: z.string(),
});

export type editProductType = z.infer<typeof editProductSchema>;

export type ProductType = addProductType | editProductType;


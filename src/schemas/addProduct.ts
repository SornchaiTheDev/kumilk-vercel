import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่อสินค้า" }),
  quantity: z
    .number({ coerce: true })
    .nonnegative({ message: "สต็อกสินค้าไม่สามารถติดลบได้" }),
  price: z
    .number({ coerce: true })
    .nonnegative({ message: "ราคาสินค้าไม่สามารถติดลบได้" })
    .min(1, { message: "ราคาสินค้าต้องมากกว่า 0" }),
  image: z.string().min(1, { message: "กรุณาเลือกรูปภาพสินค้า" }),
  description: z.string().optional(),
  status: z.preprocess((val) => val === "true", z.boolean()),
});

export type addProductType = z.infer<typeof addProductSchema>;

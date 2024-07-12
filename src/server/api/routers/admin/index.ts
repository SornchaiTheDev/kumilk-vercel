import { mergeRouters } from "@/server/api/trpc";
import { postRouter } from "./post.router";

export const adminRouter = mergeRouters(postRouter);

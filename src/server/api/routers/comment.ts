import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.comment.create({
        data: {
          text: input.text,
          authorId: ctx.session.user.id,
        },
      });
      return result;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.comment.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});

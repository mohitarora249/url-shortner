import { TRPCError } from "@trpc/server";
import z from "zod";
import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const analyticsRouter = createTRPCRouter({
  getByOrgId: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ input }) => {
      const url = new URL(
        `https://api.us-east.aws.tinybird.co/v0/pipes/untitled_pipe_1047_4148_dup.json?orgId=${input.orgId}`,
      );
      const result = await fetch(url, {
        headers: {
          Authorization: `Bearer ${env.TINY_BIRD_TOKEN}`,
        },
      })
        .then((r) => r.json())
        .then((r) => r)
        .catch((e) => e.toString());

      if (!result.data) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Analytics Error",
        });
      } else {
        return result.data as { viewCount: number; formattedDtae: string }[];
      }
    }),
});

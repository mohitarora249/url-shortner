import { TRPCError } from "@trpc/server";
import { CreateAPILKey } from "~/schemas/api-key";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { generateKey } from "~/server/keygen";
import { createCaller } from "../root";

export const apiKeyMgmtRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateAPILKey)
    .mutation(async ({ ctx, input }) => {
      const trpc = createCaller(ctx);
      const org = await trpc.organization.getById({ id: input.orgId });

      if (!org) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organization not found",
        });
      }

      if (org.apiKey) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "API key already exists",
        });
      }

      return ctx.db.organization.update({
        where: {
          id: input.orgId,
        },
        data: {
          apiKey: generateKey(),
        },
      });
    }),
});

import { MandatoryIDSchema } from "~/schemas/common";
import { CreateShortenLink, ShortenLinkSchema } from "~/schemas/links";
import { OrgIDSchema } from "~/schemas/organization";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { nanoid } from "nanoid";
import { calculateExpirationTime } from "~/server/utils";
import ratelimit from "~/server/rate-limiter";
import { TRPCError } from "@trpc/server";

export const linksRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(MandatoryIDSchema)
    .query(({ ctx, input }) => {
      return ctx.db.links.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  getByShortLink: protectedProcedure
    .input(ShortenLinkSchema)
    .query(({ ctx, input }) => {
      return ctx.db.links.findFirst({
        where: {
          shortLink: input.shortLink,
        },
        select: {
          link: true,
          expirationTime: true,
          isDeleted: true,
        },
      });
    }),
  getAllAvailableLinksByOrgId: protectedProcedure
    .input(OrgIDSchema)
    .query(({ ctx, input }) => {
      let conditions = {};
      if (input.linkType === "active") {
        conditions = { OR: [{ expirationTime: { gt: new Date() } }, { expirationTime: null }], isDeleted: false };
      } else if (input.linkType === "expired") {
        conditions = { lt: new Date(), isDeleted: false };
      } else if (input.linkType === "deleted") {
        conditions = { isDeleted: true };
      }
      return ctx.db.links.findMany({
        where: {
          organizationId: input.orgId,
          ...conditions
        },
      });
    }),
  create: protectedProcedure
    .input(CreateShortenLink)
    .mutation(async ({ ctx, input }) => {
      const { success } = await ratelimit.limit(ctx.session.user.id);
      if (!success) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      }
      return ctx.db.links.create({
        data: {
          organizationId: input.orgId,
          link: input.link,
          shortLink: nanoid(6),
          expirationTime: calculateExpirationTime(input.expiration),
        },
      });
    }),
  expireById: protectedProcedure
    .input(MandatoryIDSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.links.update({
        where: { id: input.id },
        data: { expirationTime: new Date() },
      });
    }),
  deleteById: protectedProcedure
    .input(MandatoryIDSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.links.update({
        where: { id: input.id },
        data: { isDeleted: true },
      });
    }),
});

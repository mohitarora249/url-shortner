import { MandatoryIDSchema } from "~/schemas/common";
import { CreateShortenLink, ShortenLinkSchema } from "~/schemas/links";
import { OrgIDSchema } from "~/schemas/organization";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { nanoid } from "nanoid";
import { calculateExpirationTime } from "~/server/utils";

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
      return ctx.db.links.findMany({
        where: {
          organizationId: input.orgId,
          isDeleted: false,
        },
      });
    }),
  create: protectedProcedure
    .input(CreateShortenLink)
    .mutation(async ({ ctx, input }) => {
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

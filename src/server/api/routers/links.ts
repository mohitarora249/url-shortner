import { env } from "~/env";
import { MandatoryIDSchema } from "~/schemas/common";
import { CreateShortenLink, ShortenLinkSchema } from "~/schemas/links";
import { OrgIDSchema } from "~/schemas/organization";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { nanoid } from 'nanoid'

export const linksRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(MandatoryIDSchema)
    .query(({ ctx, input }) => {
      return ctx.db.links.findFirst({
        where: {
          id: input.id
        }})
    }),
  getByShortLink: protectedProcedure
    .input(ShortenLinkSchema)
    .query(({ ctx, input }) => {
      return ctx.db.links.findFirst({
        where: {
          shortLink: input.shortLink
        },
        select: {
          link: true,
          expirationTime: {
            lt: new Date(),
          },
          isDeleted: true,
        }
      })
    }),
  getAllAvailableLinksByOrgId: protectedProcedure
    .input(OrgIDSchema)
    .query(({ ctx, input }) => {
      return ctx.db.links.findMany({
        where: {
          organizationId: input.orgId,
          isDeleted: false,
          expirationTime: {
            lt: new Date(),
          }
      })
    }),
  create: protectedProcedure
    .input(CreateShortenLink)
    .mutation(async ({ ctx, input }) => {
      // TODO: calculate expiration
      return ctx.db.links.create({
        data: {
          organizationId: input.orgId,
          link: input.link,
          shortLink: nanoid(6),
          // expiration: input.expiration
        },
      });
    }),
  expireById: protectedProcedure
    .input(MandatoryIDSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.links.update({
        where: { id: input.id },
        data: { expirationTime: new Date() }
      });
    }),
  deleteById: protectedProcedure
    .input(MandatoryIDSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.links.update({
        where: { id: input.id },
        data: { isDeleted: true }
      });
    }),
});

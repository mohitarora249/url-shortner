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
          isExpired: true,
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
          isExpired: false,
        }})
    }),
  create: protectedProcedure
    .input(CreateShortenLink)
    .mutation(async ({ ctx, input }) => {
      // const orgInfo = await ctx.db.organization.findFirst({
      //     where: {
      //     id: input.orgId
      //   }
      // });
      // const baseURL = orgInfo?.host ?? env.BASE_URL;
      // const shortLink = `${baseURL}/${nanoid(6)}`;
      return ctx.db.links.create({
        data: {
          organizationId: input.orgId,
          link: input.link,
          shortLink: nanoid(6)
        },
      });
    }),
  expireById: protectedProcedure
    .input(MandatoryIDSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.links.update({
        where: { id: input.id },
        data: { isExpired: true }
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

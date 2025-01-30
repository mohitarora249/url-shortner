import { MandatoryIDSchema } from "~/schemas/common";
import {
  CreateShortenLink,
  CreateShortenLinkViaSDK,
  ShortenLinkSchema,
} from "~/schemas/links";
import { OrgIDSchema } from "~/schemas/organization";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { nanoid } from "nanoid";
import { calculateExpirationTime } from "~/server/utils";
import ratelimit from "~/server/rate-limiter";
import { TRPCError } from "@trpc/server";
import { LINKS_PER_PAGE } from "~/constants";
import { createCaller } from "../root";

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
        conditions = {
          AND: [
            {
              OR: [
                { expirationTime: { gt: new Date() } },
                { expirationTime: null },
              ],
            },
            { isDeleted: false },
          ],
        };
      } else if (input.linkType === "expired") {
        conditions = {
          AND: [{ expirationTime: { lt: new Date() } }, { isDeleted: false }],
        };
      } else if (input.linkType === "deleted") {
        conditions = { isDeleted: true };
      }
      return ctx.db.links.findMany({
        skip: LINKS_PER_PAGE * (input.page ?? 0),
        take: LINKS_PER_PAGE,
        where: {
          AND: [{ organizationId: input.orgId }, { ...conditions }],
        },
        orderBy: {
          createdAt: "desc",
        }
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
          password: input.password ?? null
        },
      });
    }),
  createViaSDK: protectedProcedure
    .input(CreateShortenLinkViaSDK)
    .mutation(async ({ ctx, input }) => {
      const apiKey = ctx.headers.get("X-API-KEY")! as string;

      const { success } = await ratelimit.limit(apiKey);

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests. Try after some time",
        });
      }

      const trpc = createCaller(ctx);
      const org = await trpc.organization.getByAPIKey({ apiKey });

      if (!org) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organization not found",
        });
      }

      if (!org.apiKey) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "API key not found",
        });
      }

      return ctx.db.links.create({
        data: {
          organizationId: org.id,
          link: input.link,
          shortLink: nanoid(6),
          expirationTime: calculateExpirationTime(input.options.expiration),
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
  markLinkActiveFromDeletedById: protectedProcedure
    .input(MandatoryIDSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.links.update({
        where: { id: input.id },
        data: { isDeleted: false },
      });
    }),
});

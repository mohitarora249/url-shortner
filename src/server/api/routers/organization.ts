import { MandatoryIDSchema } from "~/schemas/common";
import { APIKeySchema } from "~/schemas/links";
import { CreateOrgSchema } from "~/schemas/organization";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const organizationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.organization.findMany({
      where: {
        createdById: ctx.session?.user.id,
        isDeleted: false,
      },
    });
  }),
  getById: protectedProcedure
    .input(MandatoryIDSchema)
    .query(({ ctx, input }) => {
      return ctx.db.organization.findFirst({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
      });
    }),
  getByAPIKey: protectedProcedure
    .input(APIKeySchema)
    .query(({ ctx, input }) => {
      return ctx.db.organization.findFirst({
        where: {
          apiKey: input.apiKey,
        },
      });
    }),
  getAllUserOrgById: protectedProcedure.query(({ ctx }) => {
    return ctx.db.organization.findMany({
      where: {
        createdById: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(CreateOrgSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.organization.create({
        data: {
          name: input.name,
          host: input.host ?? null,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  delete: protectedProcedure
    .input(MandatoryIDSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.organization.update({
        where: { id: input.id, createdById: ctx.session.user.id },
        data: { isDeleted: true },
      });
    }),
});

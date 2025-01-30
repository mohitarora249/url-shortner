import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { nanoid } from "nanoid";
import { calculateExpirationTime } from "~/server/utils";
import { publicRatelimit } from "~/server/rate-limiter";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const publicLinkRouter = createTRPCRouter({
	create: publicProcedure
		.input(
			z.object({
				link: z
					.string()
					.url({ message: "Must be a valid url. e.g. https://www.linklift.in" }),
				i: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { success } = await publicRatelimit.limit(input.i);

			if (!success) {
				throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Too many requests, only 2 request per 15 min is allowed. Sign up to remove the limit" });
			}

			return ctx.db.publicLinks.create({
				data: {
					link: input.link,
					shortLink: nanoid(6),
					expirationTime: calculateExpirationTime("5_MIN"),
					createdByIp: input.i,
				},
			});
		}),
	getAllMyLinks: publicProcedure
		.input(z.object({
			i: z.string()
		}))
		.query(({ ctx, input }) => {
			return ctx.db.publicLinks.findMany({
				where: {
					AND: [
						{ expirationTime: { gt: new Date() } },
						{ createdByIp: input.i },
					],
				},
			});
		}),
});

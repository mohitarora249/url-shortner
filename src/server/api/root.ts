import { organizationRouter } from "~/server/api/routers/organization";
import { linksRouter } from "~/server/api/routers/links";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { analyticsRouter } from "./routers/analytics";
import { apiKeyMgmtRouter } from "./routers/api-key-mgmt";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  organization: organizationRouter,
  links: linksRouter,
  analytics: analyticsRouter,
  apiKeyMgmt: apiKeyMgmtRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

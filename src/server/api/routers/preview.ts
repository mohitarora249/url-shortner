import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env";

export const previewRouter = createTRPCRouter({
    // https://my.linkpreview.net/
    preview: protectedProcedure
        .input(z.object({ url: z.string() }))
        .query(async ({ input }) => {
            const response = await fetch(`https://api.linkpreview.net/?key=${env.LINK_PREVIEW}&q=${encodeURIComponent(input.url)}`)
            const data = await response.json()
            return data
        })
})
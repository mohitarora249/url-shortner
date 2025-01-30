import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import cheerio from "cheerio"
import fetch from "node-fetch"

export const previewRouter = createTRPCRouter({
    // https://my.linkpreview.net/
    preview: protectedProcedure
        .input(z.object({ url: z.string() }))
        .query(async ({ input }) => {
            const response = await fetch(input.url, { headers: { "User-Agent": "Mozilla/5.0" } })
            const html = await response.text()
            const $ = cheerio.load(html)

            const getMetaTag = (name: string) =>
                $(`meta[property='og:${name}']`).attr("content") || $(`meta[name='${name}']`).attr("content") || ""

            return {
                title: getMetaTag("title") || $("title").text(),
                description: getMetaTag("description"),
                image: getMetaTag("image"),
            };
        })
})
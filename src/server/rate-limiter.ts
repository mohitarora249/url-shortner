import { Ratelimit } from "@upstash/ratelimit";
import redis from "./redis";
import { MAX_NUMBER_OF_REQ, TEN_SECONDS } from "~/constants";

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(MAX_NUMBER_OF_REQ, TEN_SECONDS),
});

export const publicRatelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(2, "15 m"),
});

export default ratelimit;


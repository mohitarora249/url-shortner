import { Ratelimit } from "@upstash/ratelimit";
import redis from "./redis";
import { MAX_NUMBER_OF_REQ, TEN_SECONDS } from "~/constants";

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(MAX_NUMBER_OF_REQ, TEN_SECONDS),
});

export default ratelimit;

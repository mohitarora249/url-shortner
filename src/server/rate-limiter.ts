import { Ratelimit } from "@upstash/ratelimit";
import redis from "./redis";

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export default ratelimit;

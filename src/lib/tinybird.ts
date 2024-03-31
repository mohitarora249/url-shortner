import { TINY_BIRD_URL } from "~/constants";
import { env } from "~/env";

type Args = {
  timestamp: string;
  action: "link_view";
  orgId: string;
  link: string;
  date: Date;
};

const sendEvent = async (event: Args) => {
  await fetch(`${TINY_BIRD_URL}/v0/events?name=url_shortner`, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      Authorization: `Bearer ${env.TINY_BIRD_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
};

export default sendEvent;

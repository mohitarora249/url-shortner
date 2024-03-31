import { TINY_BIRD_URL } from "~/constants";
import { env } from "~/env";

const sendEvent = async (event: any) => {
    await fetch(`${TINY_BIRD_URL}/v0/events?name=url_shortner`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            'Authorization': `Bearer ${env.TINY_BIRD_TOKEN}`,
            'Content-Type': 'application/json'
        },
    });
}

export default sendEvent;

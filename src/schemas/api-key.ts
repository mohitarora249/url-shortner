import { z } from "zod";

export const CreateAPILKey = z.object({ orgId: z.string() });

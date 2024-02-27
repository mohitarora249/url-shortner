import { z } from "zod";

export const MandatoryIDSchema = z.object({ id: z.string() });

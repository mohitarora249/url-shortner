import { z } from "zod";

export const CreateOrgSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  host: z.string().url({message: "Host must be a valid url."}).optional()
});

export const OrgIDSchema = z.object({ orgId: z.string() })
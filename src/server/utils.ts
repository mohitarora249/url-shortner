import { z } from "zod";
import { ExpirationEnum } from "~/schemas/links";

export const calculateExpirationTime = (
  exp: z.infer<typeof ExpirationEnum>,
) => {
  switch (exp) {
    case "5_MIN":
      return new Date(Date.now() + 5 * 60 * 1000);
    case "15_MIN":
      return new Date(Date.now() + 15 * 60 * 1000);
    case "1_HR":
      return new Date(Date.now() + 60 * 60 * 1000);
    case "24_HR":
      return new Date(Date.now() + 24 * 60 * 60 * 1000);
    case "NO_EXP":
      return null;
  }
};

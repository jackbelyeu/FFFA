// src/schemas/UpdatePlayerAvailability.ts

import { z } from "zod";

export const playeravail = z.object({
  playerId: z.number(),
  date: z.string(),
  status: z.enum(["Yes", "No", "If Needed", "Pending"]),
});

export type UpdatePlayerAvailability = z.infer<typeof playeravail>;

import { z } from "zod";

export const reviewSchema = z.object({
  role: z.string(),
  champion: z.string(),
  win: z.boolean(),
  note: z.string().max(200).optional(),
});

export type Review = z.infer<typeof reviewSchema>;

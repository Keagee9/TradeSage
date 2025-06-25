import { z } from "zod";
import { availableAssets } from "@/lib/types";

export const ResearchFormInputSchema = z.object({
  asset: z.enum(availableAssets, { required_error: "Please select an asset." }),
  query: z.string().min(10, "Your query is too short. Please be more specific.").max(200, "Query is too long."),
  documentText: z.string().optional(),
  technicalContext: z.string().optional(),
  newsArticlesText: z.string().optional(),
});

export type ResearchFormInput = z.infer<typeof ResearchFormInputSchema>;

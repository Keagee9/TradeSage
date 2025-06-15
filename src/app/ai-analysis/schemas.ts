import { z } from "zod";

export const AnalysisFormInputSchema = z.object({
  watchlist: z.array(z.string().min(1, "Asset name cannot be empty")).min(1, "Watchlist must contain at least one asset."),
  newsArticlesText: z.string().min(20, "News articles text is too short. Please provide substantial content for analysis."),
});

export type AnalysisFormInput = z.infer<typeof AnalysisFormInputSchema>;

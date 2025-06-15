"use server";

import { analyzeTradeOpportunity, AnalyzeTradeOpportunityInput, AnalyzeTradeOpportunityOutput } from "@/ai/flows/analyze-trade-opportunity";
import { z } from "zod";

const NewsArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content is too short"),
});

export const AnalysisFormInputSchema = z.object({
  watchlist: z.array(z.string().min(1, "Asset name cannot be empty")).min(1, "Watchlist must contain at least one asset."),
  newsArticlesText: z.string().min(20, "News articles text is too short. Please provide substantial content for analysis."),
});

export type AnalysisFormInput = z.infer<typeof AnalysisFormInputSchema>;

interface ActionResult {
  success: boolean;
  data?: AnalyzeTradeOpportunityOutput;
  error?: string;
  issues?: z.ZodIssue[];
}

export async function getAiTradeAnalysis(values: AnalysisFormInput): Promise<ActionResult> {
  const validationResult = AnalysisFormInputSchema.safeParse(values);
  if (!validationResult.success) {
    return { success: false, error: "Invalid input.", issues: validationResult.error.issues };
  }

  const { watchlist, newsArticlesText } = validationResult.data;

  // For simplicity, we're passing the concatenated news text as a single "news feed" item.
  // In a real app, you might parse this into multiple articles or fetch from URLs.
  const aiInput: AnalyzeTradeOpportunityInput = {
    watchlist,
    newsFeeds: [newsArticlesText], // Wrapping the text into an array as expected by the AI flow
  };

  try {
    const result = await analyzeTradeOpportunity(aiInput);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error calling AI analysis:", error);
    return { success: false, error: error instanceof Error ? error.message : "An unexpected error occurred during AI analysis." };
  }
}

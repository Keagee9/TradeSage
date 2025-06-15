"use server";

import { analyzeTradeOpportunity, type AnalyzeTradeOpportunityInput, type AnalyzeTradeOpportunityOutput } from "@/ai/flows/analyze-trade-opportunity";
import { z } from "zod";
import { AnalysisFormInputSchema, type AnalysisFormInput } from "./schemas";


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

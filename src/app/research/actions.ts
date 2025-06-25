"use server";

import { z } from "zod";
import { researchTradeOpportunity, type ResearchTradeOpportunityInput, type ResearchTradeOpportunityOutput } from "@/ai/flows/research-assistant-flow";
import { ResearchFormInputSchema, type ResearchFormInput } from "./schemas";


interface ActionResult {
  success: boolean;
  data?: ResearchTradeOpportunityOutput;
  error?: string;
  issues?: z.ZodIssue[];
}

export async function getAiResearchAnalysis(values: ResearchFormInput): Promise<ActionResult> {
  const validationResult = ResearchFormInputSchema.safeParse(values);
  if (!validationResult.success) {
    return { success: false, error: "Invalid input.", issues: validationResult.error.issues };
  }

  const { asset, query, documentText, technicalContext, newsArticlesText } = validationResult.data;

  const aiInput: ResearchTradeOpportunityInput = {
    asset,
    query,
    documentText,
    technicalContext,
    newsFeeds: newsArticlesText ? [newsArticlesText] : [],
  };

  try {
    const result = await researchTradeOpportunity(aiInput);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error calling AI research:", error);
    return { success: false, error: error instanceof Error ? error.message : "An unexpected error occurred during AI research." };
  }
}

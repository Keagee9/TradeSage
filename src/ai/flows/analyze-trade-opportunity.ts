'use server';

/**
 * @fileOverview An AI agent that analyzes news feeds to provide buy/sell recommendations for trading.
 *
 * - analyzeTradeOpportunity - A function that analyzes news feeds and provides trade recommendations.
 * - AnalyzeTradeOpportunityInput - The input type for the analyzeTradeOpportunity function.
 * - AnalyzeTradeOpportunityOutput - The return type for the analyzeTradeOpportunity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTradeOpportunityInputSchema = z.object({
  watchlist: z
    .array(z.string())
    .describe('An array of crypto and forex pairs in the user\u2019s watchlist.'),
  newsFeeds: z
    .array(z.string())
    .describe('An array of news articles related to the watchlist items.'),
});
export type AnalyzeTradeOpportunityInput = z.infer<
  typeof AnalyzeTradeOpportunityInputSchema
>;

const AnalyzeTradeOpportunityOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      asset: z.string().describe('The crypto or forex pair being recommended.'),
      action: z.enum(['buy', 'sell', 'hold']).describe('The recommended action.'),
      reason: z.string().describe('The reasoning behind the recommendation.'),
      confidence: z
        .number()
        .min(0)
        .max(1)
        .describe('A confidence score between 0 and 1 for the recommendation.'),
    })
  ),
});
export type AnalyzeTradeOpportunityOutput = z.infer<
  typeof AnalyzeTradeOpportunityOutputSchema
>;

export async function analyzeTradeOpportunity(
  input: AnalyzeTradeOpportunityInput
): Promise<AnalyzeTradeOpportunityOutput> {
  return analyzeTradeOpportunityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTradeOpportunityPrompt',
  input: {schema: AnalyzeTradeOpportunityInputSchema},
  output: {schema: AnalyzeTradeOpportunityOutputSchema},
  prompt: `You are an AI-powered trading bot specializing in analyzing news feeds for crypto and forex pairs.

You will receive a list of assets in the user's watchlist and a list of news articles related to those assets.

Based on the provided information, generate buy/sell recommendations for each asset in the watchlist.

Provide a confidence score (0-1) for each recommendation based on the strength of the supporting evidence in the news articles.

Watchlist: {{watchlist}}
News Feeds: {{newsFeeds}}

Consider these safety settings when generating the recommendations:
- Do not provide any financial advice that could lead to significant losses.
- Ensure that the recommendations are based on factual information and not speculation.
- Avoid making any predictions about future market movements.
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const analyzeTradeOpportunityFlow = ai.defineFlow(
  {
    name: 'analyzeTradeOpportunityFlow',
    inputSchema: AnalyzeTradeOpportunityInputSchema,
    outputSchema: AnalyzeTradeOpportunityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

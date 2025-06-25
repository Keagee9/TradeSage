'use server';

/**
 * @fileOverview An AI research assistant for analyzing trading opportunities.
 *
 * - researchTradeOpportunity - A function that analyzes multiple data sources to provide a trade idea.
 * - ResearchTradeOpportunityInput - The input type for the researchTradeOpportunity function.
 * - ResearchTradeOpportunityOutput - The return type for the researchTradeOpportunity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ResearchTradeOpportunityInputSchema = z.object({
  asset: z.string().describe('The crypto or forex pair being researched.'),
  query: z.string().describe('The user\'s primary question or research goal.'),
  documentText: z
    .string()
    .optional()
    .describe(
      'The text content of a research document, like a PDF or report, to be used for analysis.'
    ),
  technicalContext: z
    .string()
    .optional()
    .describe(
      'A description of the current technical analysis situation (e.g., RSI levels, chart patterns, moving average crossovers).'
    ),
  newsFeeds: z
    .array(z.string())
    .optional()
    .describe(
      'An array of recent news articles related to the asset.'
    ),
});
export type ResearchTradeOpportunityInput = z.infer<
  typeof ResearchTradeOpportunityInputSchema
>;

export const ResearchTradeOpportunityOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the analysis, synthesizing all provided information.'),
  recommendation: z
    .enum(['buy', 'sell', 'hold', 'no-clear-signal'])
    .describe('The recommended trading action based on the analysis.'),
  reasoning: z
    .string()
    .describe(
      'A detailed step-by-step reasoning for the recommendation, referencing the document, technical context, and news.'
    ),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe(
      'A confidence score (from 0 to 1) for the recommendation.'
    ),
});
export type ResearchTradeOpportunityOutput = z.infer<
  typeof ResearchTradeOpportunityOutputSchema
>;

export async function researchTradeOpportunity(
  input: ResearchTradeOpportunityInput
): Promise<ResearchTradeOpportunityOutput> {
  return researchTradeOpportunityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'researchTradeOpportunityPrompt',
  input: {schema: ResearchTradeOpportunityInputSchema},
  output: {schema: ResearchTradeOpportunityOutputSchema},
  prompt: `You are an advanced AI Trading Bot. Your task is to perform a comprehensive analysis for the asset: {{{asset}}}.
Your analysis must synthesize information from up to three sources if provided:
1.  **Fundamental Analysis**: Based on the provided news feeds.
2.  **Document Analysis**: Based on the text from a user-provided document (e.g., a research paper, whitepaper, or report).
3.  **Technical Analysis**: Based on the user's description of the current technical chart setup.

Your goal is to answer the user's query: "{{{query}}}"

Here is the data you have been given:
{{#if documentText}}
- Document Content: {{{documentText}}}
{{/if}}
{{#if technicalContext}}
- Technical Context: {{{technicalContext}}}
{{/if}}
{{#if newsFeeds}}
- Recent News: {{{newsFeeds}}}
{{/if}}

Based on a holistic analysis of the provided information, generate a trading recommendation.
- First, provide a summary of your findings.
- Then, state your recommendation (buy, sell, hold, or no-clear-signal).
- Follow with a detailed reasoning, explicitly referencing which pieces of information (from the document, technicals, or news) led to your conclusion.
- Finally, provide a confidence score for your recommendation.

Adhere to these safety guidelines:
- Clearly state if there is not enough information to make a confident recommendation.
- Do not provide definitive financial advice. Frame your output as an analysis of the provided data.
- If sources conflict (e.g., news is positive but technicals are negative), highlight the conflict in your reasoning.`,
});

const researchTradeOpportunityFlow = ai.defineFlow(
  {
    name: 'researchTradeOpportunityFlow',
    inputSchema: ResearchTradeOpportunityInputSchema,
    outputSchema: ResearchTradeOpportunityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

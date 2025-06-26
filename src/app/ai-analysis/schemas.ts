import { z } from "zod";

// ✅ Asset type
export type AssetPair = { id: string; name: string };

// ✅ List of assets
export const availableAssets: AssetPair[] = [
  { id: "BTC_USD", name: "Bitcoin / USD" },
  { id: "ETH_USD", name: "Ethereum / USD" },
];

// ✅ Extract only the `id` values
const assetEnumValues = availableAssets.map(a => a.id);

// ✅ Ensure the enum list has at least one string
if (assetEnumValues.length === 0) {
  throw new Error("availableAssets must contain at least one asset.");
}

// ✅ Convert to Zod-compatible tuple type
const enumTuple = assetEnumValues as [string, ...string[]];

// ✅ Research form schema
export const ResearchFormInputSchema = z.object({
  asset: z.enum(enumTuple, {
    required_error: "Please select an asset.",
  }),
  query: z.string()
    .min(10, "Your query is too short. Please be more specific.")
    .max(200, "Query is too long."),
  documentText: z.string().optional(),
  technicalContext: z.string().optional(),
});

export type ResearchFormInput = z.infer<typeof ResearchFormInputSchema>;

// ✅ Analysis form schema
export const AnalysisFormInputSchema = z.object({
  watchlist: z.array(z.string().min(1, "Asset name cannot be empty"))
             .min(1, "Watchlist must contain at least one asset."),
  newsArticlesText: z.string().min(20, "News articles text is too short. Please provide substantial content for analysis."),
});

export type AnalysisFormInput = z.infer<typeof AnalysisFormInputSchema>;

"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Sparkles } from "lucide-react";
import type { AnalyzeTradeOpportunityOutput } from "@/ai/flows/analyze-trade-opportunity";
import { AnalysisFormInputSchema, AnalysisFormInput, getAiTradeAnalysis } from "@/app/ai-analysis/actions";
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface AnalysisFormProps {
  onAnalysisComplete: (results: AnalyzeTradeOpportunityOutput) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

export function AnalysisForm({ onAnalysisComplete, setIsLoading, isLoading }: AnalysisFormProps) {
  const [currentWatchlistItem, setCurrentWatchlistItem] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>(['BTC/USD', 'EUR/JPY']);
  const { toast } = useToast();

  const form = useForm<AnalysisFormInput>({
    resolver: zodResolver(AnalysisFormInputSchema),
    defaultValues: {
      watchlist: watchlist,
      newsArticlesText: "Market sentiment for Bitcoin is bullish due to recent ETF approvals. Major financial institutions are increasing their BTC holdings. However, regulatory uncertainty in some regions poses a risk.\n\nEUR/JPY is experiencing volatility due to changing interest rate expectations from ECB and BoJ. Recent economic data from Eurozone shows slight improvement, while Japan's export numbers are strong.",
    },
  });

  React.useEffect(() => {
    form.setValue('watchlist', watchlist);
  }, [watchlist, form]);

  const handleAddWatchlistItem = () => {
    if (currentWatchlistItem && !watchlist.includes(currentWatchlistItem)) {
      setWatchlist(prev => [...prev, currentWatchlistItem]);
      setCurrentWatchlistItem('');
    }
  };

  const handleRemoveWatchlistItem = (itemToRemove: string) => {
    setWatchlist(prev => prev.filter(item => item !== itemToRemove));
  };

  async function onSubmit(values: AnalysisFormInput) {
    setIsLoading(true);
    try {
      const result = await getAiTradeAnalysis(values);
      if (result.success && result.data) {
        onAnalysisComplete(result.data);
        toast({
          title: "Analysis Complete",
          description: "AI recommendations have been generated.",
        });
      } else {
        const errorMessage = result.issues 
          ? result.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('\n')
          : result.error || "AI analysis failed. Please try again.";
        console.error("AI Analysis Error:", errorMessage);
        toast({
          variant: "destructive",
          title: "Analysis Error",
          description: errorMessage,
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center"><Sparkles className="h-6 w-6 mr-2 text-accent" /> AI Trade Analysis</CardTitle>
        <CardDescription>Enter your watchlist and relevant news articles to get AI-powered trade recommendations.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="watchlist-input">Watchlist Assets</Label>
              <div className="flex gap-2">
                <Input
                  id="watchlist-input"
                  placeholder="e.g., ETH/USD, AAPL"
                  value={currentWatchlistItem}
                  onChange={(e) => setCurrentWatchlistItem(e.target.value.toUpperCase())}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddWatchlistItem();}}}
                />
                <Button type="button" onClick={handleAddWatchlistItem} variant="outline">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {watchlist.map(item => (
                  <Badge key={item} variant="secondary" className="py-1 px-2 text-sm">
                    {item}
                    <button type="button" onClick={() => handleRemoveWatchlistItem(item)} className="ml-2 opacity-70 hover:opacity-100">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {form.formState.errors.watchlist && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.watchlist.message || form.formState.errors.watchlist.root?.message}</p>
              )}
            </div>

            <FormField
              control={form.control}
              name="newsArticlesText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="news-articles">News Articles Content</FormLabel>
                  <FormControl>
                    <Textarea
                      id="news-articles"
                      placeholder="Paste news article content here. Separate multiple articles with a new line or two..."
                      className="min-h-[200px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Provide relevant news text. The more context, the better the analysis.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Analyze Trades
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

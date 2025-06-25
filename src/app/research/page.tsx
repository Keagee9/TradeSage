"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, FlaskConical, Search, FileText, BarChart2, Newspaper, AlertTriangle, TrendingUp, TrendingDown, MinusCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AppLayout } from "@/components/layout/AppLayout";
import { availableAssets, type AssetPair } from '@/lib/types';
import { ResearchFormInputSchema, type ResearchFormInput } from "./schemas";
import { getAiResearchAnalysis } from "./actions";
import type { ResearchTradeOpportunityOutput } from "@/ai/flows/research-assistant-flow";
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from '@/components/ui/separator';

// Results Component
const getActionStyles = (action: 'buy' | 'sell' | 'hold' | 'no-clear-signal') => {
  switch (action) {
    case 'buy':
      return { icon: <TrendingUp className="h-5 w-5 text-green-400" />, badgeClass: "bg-green-500/20 text-green-400 border-green-500/30" };
    case 'sell':
      return { icon: <TrendingDown className="h-5 w-5 text-red-400" />, badgeClass: "bg-red-500/20 text-red-400 border-red-500/30" };
    case 'hold':
      return { icon: <MinusCircle className="h-5 w-5 text-yellow-400" />, badgeClass: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" };
    default:
       return { icon: <Info className="h-5 w-5 text-gray-400" />, badgeClass: "bg-gray-500/20 text-gray-400 border-gray-500/30" };
  }
};

function ResearchResults({ results }: { results: ResearchTradeOpportunityOutput | null }) {
  if (!results) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Research Assistant Output</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-20">
          <FlaskConical className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Your AI research results will appear here.</p>
          <p className="text-sm text-muted-foreground">Fill out the form and click "Analyze" to begin.</p>
        </CardContent>
      </Card>
    );
  }

  const { icon, badgeClass } = getActionStyles(results.recommendation);
  const confidenceColor = results.confidence > 0.7 ? "bg-green-500" : results.confidence > 0.4 ? "bg-yellow-500" : "bg-red-500";

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle>AI Research Analysis</CardTitle>
        <CardDescription>Comprehensive analysis based on your inputs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-lg bg-card/50 border">
          <h3 className="text-xl font-semibold">Recommendation</h3>
          <Badge className={`capitalize text-lg px-4 py-2 ${badgeClass}`}>
            {icon}
            <span className="ml-2">{results.recommendation.replace('-', ' ')}</span>
          </Badge>
        </div>

        <div className="space-y-2">
            <FormLabel className="text-xs text-muted-foreground">Confidence</FormLabel>
            <div className="flex items-center gap-3">
              <Progress value={results.confidence * 100} className={`w-full h-2 [&>div]:${confidenceColor}`} />
              <span className="text-base font-bold">{Math.round(results.confidence * 100)}%</span>
            </div>
        </div>
        
        <Separator />

        <div className="space-y-3">
          <h4 className="font-semibold text-lg">Summary</h4>
          <p className="text-sm text-muted-foreground leading-relaxed bg-muted p-3 rounded-md">{results.summary}</p>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">Detailed Reasoning</h4>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{results.reasoning}</p>
        </div>
      </CardContent>
    </Card>
  );
}


// Main Page Component
export default function ResearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ResearchTradeOpportunityOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<ResearchFormInput>({
    resolver: zodResolver(ResearchFormInputSchema),
    defaultValues: {
      asset: 'BTC/USD',
      query: "Given the attached whitepaper and recent news, is this a good long-term investment?",
      documentText: "",
      technicalContext: "The asset is currently in a consolidation phase on the daily chart, trading between the 50-day and 200-day moving averages. RSI is neutral around 50.",
      newsArticlesText: "",
    },
  });

  async function onSubmit(values: ResearchFormInput) {
    setIsLoading(true);
    setResults(null);
    try {
      const result = await getAiResearchAnalysis(values);
      if (result.success && result.data) {
        setResults(result.data);
        toast({
          title: "Research Complete",
          description: "AI analysis has been generated.",
        });
      } else {
        const errorMessage = result.issues 
          ? result.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('\n')
          : result.error || "AI research failed. Please try again.";
        toast({
          variant: "destructive",
          title: "Research Error",
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
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center"><FlaskConical className="h-6 w-6 mr-2 text-accent" /> AI Research Assistant</CardTitle>
              <CardDescription>Provide multiple sources of information for a comprehensive trade analysis.</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Search className="h-4 w-4 mr-2" /> Your Research Query</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Should I buy this asset?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="asset"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asset</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an asset" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableAssets.map(asset => (
                              <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="documentText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><FileText className="h-4 w-4 mr-2" /> Document Content (e.g., from a PDF)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste text from a whitepaper, report, or analysis here..."
                            className="min-h-[150px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>The AI will use this text for its analysis.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="technicalContext"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><BarChart2 className="h-4 w-4 mr-2" /> Technical Context</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the chart: e.g., 'RSI is overbought', 'Golden cross forming on daily chart'."
                            className="min-h-[100px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Describe the technical situation for the AI to consider.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newsArticlesText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Newspaper className="h-4 w-4 mr-2" /> Fundamental News</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste relevant news articles here."
                            className="min-h-[100px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FlaskConical className="mr-2 h-4 w-4" />}
                    Analyze
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-1">
          {isLoading ? (
            <Card className="h-full">
              <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-card/50 border">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-10 w-1/4" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                </div>
                 <div className="space-y-3 pt-4">
                  <Skeleton className="h-6 w-1/3" />
                  <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                  </div>
                 </div>
                 <div className="space-y-3 pt-4">
                  <Skeleton className="h-6 w-1/3" />
                  <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                  </div>
                 </div>
              </CardContent>
            </Card>
          ) : (
            <ResearchResults results={results} />
          )}
        </div>
      </div>
    </AppLayout>
  );
}

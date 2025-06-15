"use client";

import type { AnalyzeTradeOpportunityOutput } from "@/ai/flows/analyze-trade-opportunity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, MinusCircle, AlertTriangle, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisResultsProps {
  results: AnalyzeTradeOpportunityOutput | null;
}

const getActionStyles = (action: 'buy' | 'sell' | 'hold') => {
  switch (action) {
    case 'buy':
      return { icon: <TrendingUp className="h-5 w-5 text-green-400" />, badgeClass: "bg-green-500/20 text-green-400 border-green-500/30" };
    case 'sell':
      return { icon: <TrendingDown className="h-5 w-5 text-red-400" />, badgeClass: "bg-red-500/20 text-red-400 border-red-500/30" };
    case 'hold':
    default:
      return { icon: <MinusCircle className="h-5 w-5 text-yellow-400" />, badgeClass: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" };
  }
};

export function AnalysisResults({ results }: AnalysisResultsProps) {
  if (!results || results.recommendations.length === 0) {
    return (
      <Card className="mt-6 shadow-md">
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-10">
          <Info className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">No analysis results to display.</p>
          <p className="text-sm text-muted-foreground">Submit a request using the form above.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 shadow-lg">
      <CardHeader>
        <CardTitle>AI Trade Recommendations</CardTitle>
        <CardDescription>Based on the provided watchlist and news feeds.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {results.recommendations.map((rec, index) => {
          const { icon, badgeClass } = getActionStyles(rec.action);
          const confidenceColor = rec.confidence > 0.7 ? "bg-green-500" : rec.confidence > 0.4 ? "bg-yellow-500" : "bg-red-500";
          return (
            <Card key={index} className="bg-card/50 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{rec.asset}</CardTitle>
                  <Badge className={`capitalize text-sm px-3 py-1 ${badgeClass}`}>
                    {icon}
                    <span className="ml-2">{rec.action}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Reasoning:</Label>
                  <p className="text-sm leading-relaxed">{rec.reason}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Confidence:</Label>
                  <div className="flex items-center gap-2">
                     <Progress value={rec.confidence * 100} className={`w-full h-2 [&>div]:${confidenceColor}`} aria-label={`Confidence: ${Math.round(rec.confidence * 100)}%`} />
                     <span className="text-sm font-semibold">{Math.round(rec.confidence * 100)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {results.recommendations.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-500"/>
                <p>No specific recommendations could be generated for the provided input.</p>
                <p className="text-xs">Try providing more detailed news or different assets.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}

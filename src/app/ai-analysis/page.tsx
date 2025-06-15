"use client";

import React, { useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { AnalysisForm } from "@/components/ai-analysis/AnalysisForm";
import { AnalysisResults } from "@/components/ai-analysis/AnalysisResults";
import type { AnalyzeTradeOpportunityOutput } from "@/ai/flows/analyze-trade-opportunity";
import { Skeleton } from '@/components/ui/skeleton';

export default function AiAnalysisPage() {
  const [analysisResults, setAnalysisResults] = useState<AnalyzeTradeOpportunityOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-1">
          <AnalysisForm 
            onAnalysisComplete={setAnalysisResults} 
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="mt-6 space-y-6">
              <Skeleton className="h-12 w-1/2" />
              <Skeleton className="h-8 w-3/4" />
              <div className="space-y-4">
                {[1,2].map(i => (
                  <div key={i} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-1/4" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-1/2" />
                     <div className="flex items-center gap-2 pt-2">
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <AnalysisResults results={analysisResults} />
          )}
        </div>
      </div>
    </AppLayout>
  );
}

"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Line, LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartDataPoint, AssetPair } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableAssets } from '@/lib/types';

const generateRandomData = (asset: AssetPair, numPoints = 30): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let value = asset.startsWith('BTC') ? 60000 : asset.startsWith('ETH') ? 3000 : 1.1; // Starting value based on asset
  const now = new Date();
  for (let i = numPoints -1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 1000); // Data points per minute
    data.push({ time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), value: parseFloat(value.toFixed(asset.includes('/') ? 4 : 2)) });
    const change = (Math.random() - 0.48) * (value * 0.002); // Smaller, more frequent changes
    value += change;
    if (value < 0) value = 0.01; // Prevent negative prices
  }
  return data;
};


export function PriceChart() {
  const [selectedAsset, setSelectedAsset] = useState<AssetPair>('BTC/USD');
  const [chartData, setChartData] = useState<ChartDataPoint[]>(generateRandomData(selectedAsset));

  const chartConfig = useMemo<ChartConfig>(() => ({
    price: {
      label: selectedAsset,
      color: "hsl(var(--accent))",
    },
  }), [selectedAsset]);

  useEffect(() => {
    setChartData(generateRandomData(selectedAsset)); // Initial data for selected asset
    
    const interval = setInterval(() => {
      setChartData(prevData => {
        const newDataPointTime = new Date();
        let newValue = prevData.length > 0 ? prevData[prevData.length - 1].value : (selectedAsset.startsWith('BTC') ? 60000 : selectedAsset.startsWith('ETH') ? 3000 : 1.1);
        const change = (Math.random() - 0.48) * (newValue * 0.001); // Smaller, more frequent changes
        newValue += change;
        if (newValue < 0) newValue = 0.01;

        const newData = [
          ...prevData.slice(1), // Remove the oldest data point
          { time: newDataPointTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), value: parseFloat(newValue.toFixed(selectedAsset.includes('/') ? 4 : 2)) }
        ];
        return newData;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [selectedAsset]);

  const handleAssetChange = (value: string) => {
    setSelectedAsset(value as AssetPair);
  };
  
  const yAxisDomain = useMemo(() => {
    if (chartData.length === 0) return ['auto', 'auto'];
    const values = chartData.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1; // 10% padding
    return [Math.max(0, min - padding), max + padding];
  }, [chartData]);


  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <CardTitle>Live Price Chart</CardTitle>
          <CardDescription>Real-time price movements for {selectedAsset}</CardDescription>
        </div>
        <Select onValueChange={handleAssetChange} defaultValue={selectedAsset}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select Asset" />
          </SelectTrigger>
          <SelectContent>
            {availableAssets.map(asset => (
              <SelectItem key={asset} value={asset}>{asset}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-video h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
              accessibilityLayer
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8}
                tickFormatter={(value) => value} 
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8} 
                tickFormatter={(value) => `$${value.toLocaleString()}`} 
                domain={yAxisDomain}
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip 
                cursor={{stroke: "hsl(var(--border))", strokeWidth: 1, strokeDasharray: "3 3"}}
                content={<ChartTooltipContent indicator="dot" hideLabel />} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-price)" 
                strokeWidth={2} 
                dot={false} 
                activeDot={{ r: 6, style: { fill: "var(--color-price)", opacity: 0.8 } }}
                name={chartConfig.price.label}
                animationDuration={300}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

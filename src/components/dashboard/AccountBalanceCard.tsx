"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import React, { useState, useEffect } from 'react';

export function AccountBalanceCard() {
  const [balance, setBalance] = useState(25000.00); // Initial balance
  const [dailyPnl, setDailyPnl] = useState(150.75); // Example daily P&L

  useEffect(() => {
    // Simulate balance updates if needed, or fetch from an API
    const interval = setInterval(() => {
      // Example: Simulate small P&L fluctuations
      const pnlChange = (Math.random() - 0.5) * 50;
      setDailyPnl(prevPnl => parseFloat((prevPnl + pnlChange).toFixed(2)));
      setBalance(prevBalance => parseFloat((prevBalance + pnlChange).toFixed(2)));
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);


  const PnlIcon = dailyPnl >= 0 ? TrendingUp : TrendingDown;
  const pnlColor = dailyPnl >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
        <DollarSign className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div className={`text-xs ${pnlColor} flex items-center mt-1`}>
          <PnlIcon className="h-4 w-4 mr-1" />
          {dailyPnl >= 0 ? '+' : ''}${dailyPnl.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} today
        </div>
        <CardDescription className="text-xs text-muted-foreground mt-2">
          Total value of your assets and cash.
        </CardDescription>
      </CardContent>
    </Card>
  );
}

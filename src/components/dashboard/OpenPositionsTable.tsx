"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Position } from "@/lib/types";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const initialPositions: Position[] = [
  { id: '1', asset: 'BTC/USD', amount: 0.5, entryPrice: 60000, currentPrice: 62000, pnl: 1000, pnlPercentage: 3.33, type: 'long' },
  { id: '2', asset: 'ETH/USD', amount: 10, entryPrice: 3000, currentPrice: 2950, pnl: -500, pnlPercentage: -1.67, type: 'long' },
  { id: '3', asset: 'EUR/USD', amount: 10000, entryPrice: 1.0800, currentPrice: 1.0850, pnl: 50, pnlPercentage: 0.46, type: 'short' },
];

export function OpenPositionsTable() {
  const [positions, setPositions] = useState<Position[]>(initialPositions);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prevPositions =>
        prevPositions.map(pos => {
          const priceChange = (Math.random() - 0.5) * (pos.currentPrice * 0.005); // Simulate small price change
          const newCurrentPrice = parseFloat((pos.currentPrice + priceChange).toFixed(pos.asset.includes('/') ? 4 : 2));
          const pnl = (newCurrentPrice - pos.entryPrice) * pos.amount * (pos.type === 'short' ? -1 : 1);
          const pnlPercentage = (pnl / (pos.entryPrice * pos.amount)) * 100;
          return { ...pos, currentPrice: newCurrentPrice, pnl: parseFloat(pnl.toFixed(2)), pnlPercentage: parseFloat(pnlPercentage.toFixed(2)) };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Open Positions</CardTitle>
        <CardDescription>Your currently active trades.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Entry Price</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
              <TableHead className="text-right">P&L</TableHead>
              <TableHead className="text-right">P&L %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">No open positions.</TableCell>
              </TableRow>
            ) : (
              positions.map((position) => (
                <TableRow key={position.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{position.asset}</TableCell>
                  <TableCell>
                    <Badge variant={position.type === 'long' ? 'default' : 'secondary'} 
                           className={position.type === 'long' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                      {position.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{position.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${position.entryPrice.toLocaleString(undefined, { minimumFractionDigits: position.asset.includes('/') ? 4 : 2 })}</TableCell>
                  <TableCell className="text-right">${position.currentPrice.toLocaleString(undefined, { minimumFractionDigits: position.asset.includes('/') ? 4 : 2 })}</TableCell>
                  <TableCell className={`text-right font-semibold ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <span className="flex items-center justify-end">
                      {position.pnl >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                      {position.pnl >= 0 ? '+' : ''}${position.pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </TableCell>
                  <TableCell className={`text-right ${position.pnlPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {position.pnlPercentage >= 0 ? '+' : ''}{position.pnlPercentage.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

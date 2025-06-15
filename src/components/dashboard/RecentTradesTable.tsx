"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Trade } from "@/lib/types";
import { formatDistanceToNow } from 'date-fns';

const mockTrades: Trade[] = [
  { id: '1', asset: 'BTC/USD', type: 'buy', amount: 0.1, price: 61500, timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), status: 'filled' },
  { id: '2', asset: 'ETH/USD', type: 'sell', amount: 2, price: 3050, timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), status: 'filled' },
  { id: '3', asset: 'EUR/USD', type: 'buy', amount: 5000, price: 1.0820, timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), status: 'filled' },
  { id: '4', asset: 'GBP/USD', type: 'sell', amount: 2000, price: 1.2750, timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), status: 'pending' },
];

export function RecentTradesTable() {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Recent Trades</CardTitle>
        <CardDescription>Your latest trade activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTrades.length === 0 ? (
               <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">No recent trades.</TableCell>
              </TableRow>
            ) : (
              mockTrades.map((trade) => (
                <TableRow key={trade.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{trade.asset}</TableCell>
                  <TableCell>
                    <Badge variant={trade.type === 'buy' ? 'default' : 'secondary'}
                           className={trade.type === 'buy' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                      {trade.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{trade.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${trade.price.toLocaleString(undefined, { minimumFractionDigits: trade.asset.includes('/') ? 4 : 2 })}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {formatDistanceToNow(new Date(trade.timestamp), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      trade.status === 'filled' ? 'default' :
                      trade.status === 'pending' ? 'outline' : 'destructive'
                    }
                    className={
                      trade.status === 'filled' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                      trade.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }>
                      {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
                    </Badge>
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

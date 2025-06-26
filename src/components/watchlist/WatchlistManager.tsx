"use client";

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, PlusCircle, Star, Trash2 } from "lucide-react";
import type { WatchlistItem } from "@/lib/types";
import { availableAssets, AssetPair } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge";


const initialWatchlist: WatchlistItem[] = [
  { id: '1', name: 'BTC/USD', type: 'crypto', lastPrice: 62500.75, change24h: 1.5 },
  { id: '2', name: 'EUR/USD', type: 'forex', lastPrice: 1.0835, change24h: -0.2 },
];

export function WatchlistManager() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(initialWatchlist);
  const [newItemName, setNewItemName] = useState<AssetPair | ''>('');

  useEffect(() => {
    // Simulate price updates for watchlist items
    const interval = setInterval(() => {
      setWatchlist(prevWatchlist =>
        prevWatchlist.map(item => {
          const priceChangeFactor = item.type === 'crypto' ? 0.001 : 0.0001;
          const change = (Math.random() - 0.5) * (item.lastPrice ?? (item.name.startsWith('BTC') ? 60000 : 1)) * priceChangeFactor * 10;
          const newPrice = parseFloat(((item.lastPrice ?? (item.name.startsWith('BTC') ? 60000 : 1)) + change).toFixed(item.type === 'crypto' ? 2 : 4));
          const newChange24h = parseFloat(((item.change24h ?? 0) + (Math.random() - 0.5) * 0.1).toFixed(2));
          return { ...item, lastPrice: newPrice, change24h: newChange24h };
        })
      );
    }, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleAddItem = () => {
    if (newItemName && !watchlist.find(item => item.name === newItemName)) {
      const isCrypto = newItemName.includes('USD') && (newItemName.startsWith('BTC') || newItemName.startsWith('ETH'));
      const newItem: WatchlistItem = {
        id: Date.now().toString(),
        name: newItemName,
        type: isCrypto ? 'crypto' : 'forex',
        lastPrice: newItemName.startsWith('BTC') ? 60000 : newItemName.startsWith('ETH') ? 3000 : 1.1, // Mock price
        change24h: parseFloat(((Math.random() - 0.5) * 2).toFixed(2)), // Mock change
      };
      setWatchlist([...watchlist, newItem]);
      setNewItemName('');
    }
  };

  const handleRemoveItem = (id: string) => {
    setWatchlist(watchlist.filter(item => item.id !== id));
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center"><Star className="h-6 w-6 mr-2 text-yellow-400" /> Your Watchlist</CardTitle>
        <CardDescription>Keep track of your favorite crypto and forex pairs.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Select onValueChange={(value) => setNewItemName(value as AssetPair)} value={newItemName}>
            <SelectTrigger className="flex-grow">
              <SelectValue placeholder="Select an asset to add" />
            </SelectTrigger>
            <SelectContent>
              {availableAssets.filter(asset => !watchlist.find(item => item.name === asset)).map(asset => (
                <SelectItem key={asset} value={asset}>{asset}</SelectItem>
              ))}
              {availableAssets.filter(asset => !watchlist.find(item => item.name === asset)).length === 0 && (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">All assets added.</div>
              )}
            </SelectContent>
          </Select>
          <Button onClick={handleAddItem} disabled={!newItemName} aria-label="Add to watchlist">
            <PlusCircle className="h-5 w-5" /> <span className="ml-2 hidden sm:inline">Add</span>
          </Button>
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Star className="h-12 w-12 mx-auto mb-2" />
            <p>Your watchlist is empty.</p>
            <p className="text-sm">Add assets using the field above.</p>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Last Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watchlist.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                     <Badge variant="outline" className="capitalize">{item.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.lastPrice?.toLocaleString(undefined, { minimumFractionDigits: item.type === 'crypto' ? 2 : 4, maximumFractionDigits: item.type === 'crypto' ? 2 : 4 }) ?? 'N/A'}
                  </TableCell>
                  <TableCell className={`text-right ${item.change24h && item.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change24h ? `${item.change24h >= 0 ? '+' : ''}${item.change24h.toFixed(2)}%` : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} aria-label={`Remove ${item.name} from watchlist`}>
                      <Trash2 className="h-4 w-4 text-red-500 hover:text-red-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        )}
      </CardContent>
    </Card>
  );
}

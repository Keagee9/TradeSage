export interface Trade {
  id: string;
  asset: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: string; // ISO date string
  status: 'filled' | 'pending' | 'cancelled';
}

export interface Position {
  id: string;
  asset: string;
  amount: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
  type: 'long' | 'short';
}

export interface WatchlistItem {
  id: string;
  name: string; // e.g., BTC/USD, EUR/USD
  type: 'crypto' | 'forex';
  lastPrice?: number;
  change24h?: number; // Percentage change
}

export interface ChartDataPoint {
  time: string; // Could be timestamp or formatted date/time string
  value: number;
}

export type AssetPair = 'BTC/USD' | 'ETH/USD' | 'EUR/USD' | 'GBP/USD' | 'USD/JPY';

export const availableAssets: AssetPair[] = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'GBP/USD', 'USD/JPY'];

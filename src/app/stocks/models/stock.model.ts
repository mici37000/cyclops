import { MarketStatus } from '../enums/market-status.enum';
import { HistoricalData } from './historical-data.model';

export interface Stock {
  symbol: string;
  companyName: string;
  currentPrice: number;
  percentageChange: number;
  marketStatus: MarketStatus;
  historicalData: HistoricalData[];
  volume: number;
  high: number;
  low: number;
}

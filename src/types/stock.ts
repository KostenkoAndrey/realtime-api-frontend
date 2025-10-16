export interface Stock {
  name: string;
  symbol: string;
  price: number;
  market_cap: number;
  dailyChange: number;
  monthlyChange: number;
  locale: string;
  primary_exchange: string;
}
export interface StockCardProps {
  stocks: Stock[];
}

export interface StocksResponse {
  message: string;
  count: number;
  data: Stock[];
}

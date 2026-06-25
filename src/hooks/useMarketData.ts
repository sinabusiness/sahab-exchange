import { useQuery } from "@tanstack/react-query";

export interface CoinMarketData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  total_volume: number;
  market_cap: number;
  high_24h: number;
  low_24h: number;
  ath: number;
  ath_change_percentage: number;
  circulating_supply: number;
  sparkline_in_7d?: { price: number[] };
}

const CACHE_KEY = "sarraf_market_cache_v1";
const CACHE_TTL = 5 * 60 * 1000;

function readCache(): CoinMarketData[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { t, v } = JSON.parse(raw);
    if (Date.now() - t > CACHE_TTL) return null;
    return v;
  } catch {
    return null;
  }
}

function writeCache(data: CoinMarketData[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), v: data }));
  } catch {}
}

const fetchCoinMarket = async (): Promise<CoinMarketData[]> => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
  );
  if (!res.ok) throw new Error("coin market api");
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) throw new Error("empty response");
  writeCache(data);
  return data;
};

const FALLBACK: CoinMarketData[] = [
  { id:"bitcoin",name:"Bitcoin",symbol:"BTC",image:"https://assets.coingecko.com/coins/images/1/small/bitcoin.png",current_price:0,price_change_percentage_24h:0,total_volume:0,market_cap:0,high_24h:0,low_24h:0,ath:0,ath_change_percentage:0,circulating_supply:0 },
];

export function useCoinMarketData() {
  return useQuery<CoinMarketData[], Error>({
    queryKey: ["coin-market-data"],
    queryFn: fetchCoinMarket,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 30_000,
    retry: 2,
    initialData: () => readCache() ?? FALLBACK,
    initialDataUpdatedAt: 0,
  });
}

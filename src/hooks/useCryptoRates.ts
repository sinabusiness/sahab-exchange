import { useQuery } from "@tanstack/react-query";

export interface CryptoRate {
  id: string;
  name: string;
  nameAr: string;
  symbol: string;
  price: number;
  change24h: number;
  image: string;
}

export interface MetalRate {
  name: string;
  nameAr: string;
  pricePerOz: number;
  change24h: number;
  symbol: string;
}

export interface FiatRate {
  code: string;
  nameAr: string;
  rate: number;
  flag: string;
}

export interface IranRate {
  market: string;
  price: number;
  source: string;
}

// ---------- localStorage cache (so the page never shows months-old data) ----------
const CACHE_PREFIX = "sarraf_cache_v2_";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // keep last good value up to 24h

function readCache<T>(key: string): T | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return undefined;
    const { t, v } = JSON.parse(raw);
    if (Date.now() - t > CACHE_TTL_MS) return undefined;
    return v as T;
  } catch {
    return undefined;
  }
}
function writeCache<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ t: Date.now(), v: value }));
  } catch {}
}

// ---------- Hard fallbacks (only used if there is no cache AND the API is down) ----------
const CRYPTO_FALLBACK: CryptoRate[] = [
  { id: "bitcoin", name: "Bitcoin", nameAr: "بيتكوين", symbol: "BTC", price: 77400, change24h: 1.2, image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
  { id: "ethereum", name: "Ethereum", nameAr: "إيثريوم", symbol: "ETH", price: 2136, change24h: 1.3, image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
  { id: "tether", name: "Tether", nameAr: "تيثر", symbol: "USDT", price: 1.0, change24h: 0, image: "https://assets.coingecko.com/coins/images/325/small/Tether.png" },
  { id: "ripple", name: "XRP", nameAr: "ريبل", symbol: "XRP", price: 1.37, change24h: 0.6, image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png" },
  { id: "binancecoin", name: "BNB", nameAr: "بينانس", symbol: "BNB", price: 648, change24h: 1.6, image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png" },
  { id: "solana", name: "Solana", nameAr: "سولانا", symbol: "SOL", price: 86, change24h: 2.0, image: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
];

const METALS_FALLBACK: MetalRate[] = [
  { name: "Gold", nameAr: "الذهب", pricePerOz: 4533, change24h: 0.5, symbol: "XAU" },
  { name: "Silver", nameAr: "الفضة", pricePerOz: 76, change24h: -0.2, symbol: "XAG" },
];

const FIAT_DEFS: Omit<FiatRate, "rate">[] = [
  { code: "AED", nameAr: "درهم إماراتي", flag: "🇦🇪" },
  { code: "SAR", nameAr: "ريال سعودي", flag: "🇸🇦" },
  { code: "KWD", nameAr: "دينار كويتي", flag: "🇰🇼" },
  { code: "QAR", nameAr: "ريال قطري", flag: "🇶🇦" },
  { code: "BHD", nameAr: "دينار بحريني", flag: "🇧🇭" },
  { code: "OMR", nameAr: "ريال عماني", flag: "🇴🇲" },
  { code: "EGP", nameAr: "جنيه مصري", flag: "🇪🇬" },
  { code: "IRR", nameAr: "ریال ایرانی", flag: "🇮🇷" },
  { code: "IQD", nameAr: "دينار عراقي", flag: "🇮🇶" },
  { code: "TRY", nameAr: "ليرة تركية", flag: "🇹🇷" },
];

const FIAT_FALLBACK_RATES: Record<string, number> = {
  AED: 3.67, SAR: 3.75, KWD: 0.308, QAR: 3.64, BHD: 0.376,
  OMR: 0.385, EGP: 53.1, IRR: 1780000, IQD: 1311, TRY: 45.6,
};

export const fiatRates: FiatRate[] = FIAT_DEFS.map((f) => ({ ...f, rate: FIAT_FALLBACK_RATES[f.code] }));
export const metalRates: MetalRate[] = METALS_FALLBACK;

// ---------- Fetchers ----------
const fetchCryptoRates = async (): Promise<CryptoRate[]> => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,ripple,binancecoin,solana&order=market_cap_desc&sparkline=false"
  );
  if (!res.ok) throw new Error("crypto api");
  const data = await res.json();
  const arNames: Record<string, string> = {
    bitcoin: "بيتكوين", ethereum: "إيثريوم", tether: "تيثر",
    ripple: "ريبل", binancecoin: "بينانس", solana: "سولانا",
  };
  const mapped: CryptoRate[] = data.map((coin: any) => ({
    id: coin.id,
    name: coin.name,
    nameAr: arNames[coin.id] || coin.name,
    symbol: coin.symbol.toUpperCase(),
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h || 0,
    image: coin.image,
  }));
  writeCache("crypto", mapped);
  return mapped;
};

const fetchFiatRates = async (): Promise<FiatRate[]> => {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("fiat api");
  const data = await res.json();
  const rates = data?.rates || {};
  // open.er-api returns the OFFICIAL IRR rate (~42k-1.2M). We want the FREE-MARKET rate.
  // Pull it from the Iranian exchanges edge function and override IRR.
  let freeMarketIRR: number | null = null;
  try {
    const ir = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/iran-rates`, {
      headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string },
    });
    if (ir.ok) {
      const j = await ir.json();
      if (typeof j?.average === "number" && j.average > 500_000) freeMarketIRR = j.average;
    }
  } catch {}
  const mapped = FIAT_DEFS.map((f) => {
    if (f.code === "IRR") {
      return { ...f, rate: freeMarketIRR ?? FIAT_FALLBACK_RATES.IRR };
    }
    return {
      ...f,
      rate: typeof rates[f.code] === "number" ? rates[f.code] : FIAT_FALLBACK_RATES[f.code],
    };
  });
  writeCache("fiat", mapped);
  return mapped;
};

const fetchMetalRates = async (): Promise<MetalRate[]> => {
  const [goldRes, silverRes] = await Promise.all([
    fetch("https://api.gold-api.com/price/XAU"),
    fetch("https://api.gold-api.com/price/XAG"),
  ]);
  const gold = goldRes.ok ? await goldRes.json() : null;
  const silver = silverRes.ok ? await silverRes.json() : null;
  const mapped: MetalRate[] = [
    { name: "Gold", nameAr: "الذهب", symbol: "XAU", pricePerOz: gold?.price ?? METALS_FALLBACK[0].pricePerOz, change24h: METALS_FALLBACK[0].change24h },
    { name: "Silver", nameAr: "الفضة", symbol: "XAG", pricePerOz: silver?.price ?? METALS_FALLBACK[1].pricePerOz, change24h: METALS_FALLBACK[1].change24h },
  ];
  writeCache("metals", mapped);
  return mapped;
};

const fetchIranRates = async (): Promise<IranRate[]> => {
  // Nobitex / Wallex block browser CORS — route via our edge function.
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/iran-rates`;
  const res = await fetch(url, {
    headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string },
  });
  if (!res.ok) throw new Error("iran api");
  const data = await res.json();
  const mapped: IranRate[] = data.rates || [];
  writeCache("iran", mapped);
  return mapped;
};

// ---------- Hooks ----------
export function useCryptoRates() {
  return useQuery({
    queryKey: ["crypto-rates"],
    queryFn: fetchCryptoRates,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 30_000,
    initialData: () => readCache<CryptoRate[]>("crypto") ?? CRYPTO_FALLBACK,
    initialDataUpdatedAt: 0, // force immediate refetch on mount
  });
}

export function useFiatRates() {
  return useQuery({
    queryKey: ["fiat-rates"],
    queryFn: fetchFiatRates,
    refetchInterval: 5 * 60_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 60_000,
    initialData: () => readCache<FiatRate[]>("fiat") ?? fiatRates,
    initialDataUpdatedAt: 0,
  });
}

export function useMetalRates() {
  return useQuery({
    queryKey: ["metal-rates"],
    queryFn: fetchMetalRates,
    refetchInterval: 5 * 60_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 60_000,
    initialData: () => readCache<MetalRate[]>("metals") ?? METALS_FALLBACK,
    initialDataUpdatedAt: 0,
  });
}

export function useIranRates() {
  return useQuery({
    queryKey: ["iran-rates"],
    queryFn: fetchIranRates,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 30_000,
    initialData: () => readCache<IranRate[]>("iran") ?? [],
    initialDataUpdatedAt: 0,
  });
}

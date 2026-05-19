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

// Fallback values reflective of May 17, 2026 (used only if the live APIs are unreachable).
const CRYPTO_FALLBACK: CryptoRate[] = [
  { id: "bitcoin", name: "Bitcoin", nameAr: "بيتكوين", symbol: "BTC", price: 118420, change24h: 1.8, image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
  { id: "ethereum", name: "Ethereum", nameAr: "إيثريوم", symbol: "ETH", price: 4185, change24h: 2.1, image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
  { id: "tether", name: "Tether", nameAr: "تيثر", symbol: "USDT", price: 1.0, change24h: 0.02, image: "https://assets.coingecko.com/coins/images/325/small/Tether.png" },
  { id: "ripple", name: "XRP", nameAr: "ريبل", symbol: "XRP", price: 3.12, change24h: -0.9, image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png" },
  { id: "binancecoin", name: "BNB", nameAr: "بينانس", symbol: "BNB", price: 742, change24h: 0.6, image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png" },
  { id: "solana", name: "Solana", nameAr: "سولانا", symbol: "SOL", price: 218, change24h: 3.4, image: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
];

const METALS_FALLBACK: MetalRate[] = [
  { name: "Gold", nameAr: "الذهب", pricePerOz: 3245, change24h: 0.5, symbol: "XAU" },
  { name: "Silver", nameAr: "الفضة", pricePerOz: 41.8, change24h: -0.2, symbol: "XAG" },
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
  AED: 3.67, SAR: 3.75, KWD: 0.307, QAR: 3.64, BHD: 0.376,
  OMR: 0.385, EGP: 62.4, IRR: 71500, IQD: 1465, TRY: 48.9,
};

// Static export kept for backwards compatibility (used as initial/fallback list).
export const fiatRates: FiatRate[] = FIAT_DEFS.map((f) => ({ ...f, rate: FIAT_FALLBACK_RATES[f.code] }));
export const metalRates: MetalRate[] = METALS_FALLBACK;

const fetchCryptoRates = async (): Promise<CryptoRate[]> => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,ripple,binancecoin,solana&order=market_cap_desc&sparkline=false"
    );
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    const arNames: Record<string, string> = {
      bitcoin: "بيتكوين", ethereum: "إيثريوم", tether: "تيثر",
      ripple: "ريبل", binancecoin: "بينانس", solana: "سولانا",
    };
    return data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      nameAr: arNames[coin.id] || coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h || 0,
      image: coin.image,
    }));
  } catch {
    return CRYPTO_FALLBACK;
  }
};

const fetchFiatRates = async (): Promise<FiatRate[]> => {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    const rates = data?.rates || {};
    return FIAT_DEFS.map((f) => ({
      ...f,
      rate: typeof rates[f.code] === "number" ? rates[f.code] : FIAT_FALLBACK_RATES[f.code],
    }));
  } catch {
    return fiatRates;
  }
};

const fetchMetalRates = async (): Promise<MetalRate[]> => {
  try {
    const [goldRes, silverRes] = await Promise.all([
      fetch("https://api.gold-api.com/price/XAU"),
      fetch("https://api.gold-api.com/price/XAG"),
    ]);
    const gold = goldRes.ok ? await goldRes.json() : null;
    const silver = silverRes.ok ? await silverRes.json() : null;
    return [
      { name: "Gold", nameAr: "الذهب", symbol: "XAU", pricePerOz: gold?.price ?? METALS_FALLBACK[0].pricePerOz, change24h: METALS_FALLBACK[0].change24h },
      { name: "Silver", nameAr: "الفضة", symbol: "XAG", pricePerOz: silver?.price ?? METALS_FALLBACK[1].pricePerOz, change24h: METALS_FALLBACK[1].change24h },
    ];
  } catch {
    return METALS_FALLBACK;
  }
};

export function useCryptoRates() {
  return useQuery({
    queryKey: ["crypto-rates"],
    queryFn: fetchCryptoRates,
    refetchInterval: 60000,
    staleTime: 30000,
  });
}

export function useFiatRates() {
  return useQuery({
    queryKey: ["fiat-rates"],
    queryFn: fetchFiatRates,
    refetchInterval: 5 * 60_000,
    staleTime: 2 * 60_000,
    initialData: fiatRates,
  });
}

export function useMetalRates() {
  return useQuery({
    queryKey: ["metal-rates"],
    queryFn: fetchMetalRates,
    refetchInterval: 5 * 60_000,
    staleTime: 2 * 60_000,
    initialData: metalRates,
  });
}

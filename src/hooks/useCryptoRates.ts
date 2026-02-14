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

const fetchCryptoRates = async (): Promise<CryptoRate[]> => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,ripple,binancecoin,solana&order=market_cap_desc&sparkline=false"
    );
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    const arNames: Record<string, string> = {
      bitcoin: "بيتكوين",
      ethereum: "إيثريوم",
      tether: "تيثر",
      ripple: "ريبل",
      binancecoin: "بينانس",
      solana: "سولانا",
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
    // Fallback data
    return [
      { id: "bitcoin", name: "Bitcoin", nameAr: "بيتكوين", symbol: "BTC", price: 104250, change24h: 2.4, image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
      { id: "ethereum", name: "Ethereum", nameAr: "إيثريوم", symbol: "ETH", price: 3285, change24h: -1.2, image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
      { id: "tether", name: "Tether", nameAr: "تيثر", symbol: "USDT", price: 1.0, change24h: 0.01, image: "https://assets.coingecko.com/coins/images/325/small/Tether.png" },
      { id: "ripple", name: "XRP", nameAr: "ريبل", symbol: "XRP", price: 2.48, change24h: 3.1, image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png" },
      { id: "binancecoin", name: "BNB", nameAr: "بينانس", symbol: "BNB", price: 685, change24h: 0.8, image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png" },
      { id: "solana", name: "Solana", nameAr: "سولانا", symbol: "SOL", price: 172, change24h: -0.5, image: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
    ];
  }
};

export const metalRates: MetalRate[] = [
  { name: "Gold", nameAr: "الذهب", pricePerOz: 2935, change24h: 0.8, symbol: "XAU" },
  { name: "Silver", nameAr: "الفضة", pricePerOz: 32.5, change24h: -0.3, symbol: "XAG" },
];

export const fiatRates: FiatRate[] = [
  { code: "AED", nameAr: "درهم إماراتي", rate: 3.67, flag: "🇦🇪" },
  { code: "SAR", nameAr: "ريال سعودي", rate: 3.75, flag: "🇸🇦" },
  { code: "KWD", nameAr: "دينار كويتي", rate: 0.31, flag: "🇰🇼" },
  { code: "QAR", nameAr: "ريال قطري", rate: 3.64, flag: "🇶🇦" },
  { code: "BHD", nameAr: "دينار بحريني", rate: 0.376, flag: "🇧🇭" },
  { code: "OMR", nameAr: "ريال عماني", rate: 0.385, flag: "🇴🇲" },
  { code: "EGP", nameAr: "جنيه مصري", rate: 50.5, flag: "🇪🇬" },
  { code: "IRR", nameAr: "ریال ایرانی", rate: 42000, flag: "🇮🇷" },
  { code: "IQD", nameAr: "دينار عراقي", rate: 1310, flag: "🇮🇶" },
  { code: "TRY", nameAr: "ليرة تركية", rate: 36.2, flag: "🇹🇷" },
];

export function useCryptoRates() {
  return useQuery({
    queryKey: ["crypto-rates"],
    queryFn: fetchCryptoRates,
    refetchInterval: 60000,
    staleTime: 30000,
  });
}

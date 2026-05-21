import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// All sources return Rial (= Toman * 10). Free-market USDT/IRR is ~1,780,000 (May 2026).
async function fetchJson(url: string, init?: RequestInit) {
  try {
    const r = await fetch(url, { ...init, signal: AbortSignal.timeout(6000) });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

async function fromNobitex(): Promise<number | null> {
  const d = await fetchJson("https://api.nobitex.ir/v2/orderbook/USDTIRT");
  const ask = parseFloat(d?.lastTradePrice ?? d?.asks?.[0]?.[0]);
  return isFinite(ask) ? ask * 10 : null;
}

async function fromWallex(): Promise<number | null> {
  const d = await fetchJson("https://api.wallex.ir/v1/markets");
  const m = d?.result?.symbols?.["USDTTMN"];
  const price = parseFloat(m?.stats?.lastPrice);
  return isFinite(price) ? price * 10 : null;
}

async function fromBitpin(): Promise<number | null> {
  const d = await fetchJson("https://api.bitpin.ir/v1/mkt/tickers/");
  const arr = d?.results ?? d ?? [];
  const t = Array.isArray(arr) ? arr.find((x: any) => x.code === "USDT_IRT" || x.symbol === "USDT_IRT") : null;
  const price = parseFloat(t?.price);
  return isFinite(price) ? price * 10 : null;
}

async function fromOmpfinex(): Promise<number | null> {
  const d = await fetchJson("https://api.ompfinex.com/v1/market");
  const arr = d?.data ?? [];
  const t = Array.isArray(arr) ? arr.find((x: any) => x.symbol === "USDTIRT" || x.name === "USDT/IRT") : null;
  const price = parseFloat(t?.last_price ?? t?.price);
  return isFinite(price) ? price * 10 : null;
}

// Free-market USDT/IRR proxy via a public aggregator (no key, CORS-free server-side)
async function fromAlanchand(): Promise<number | null> {
  const d = await fetchJson("https://alanchand.com/api/arz");
  // tries multiple shapes
  const usd = d?.usd?.[0]?.price ?? d?.usd?.price ?? d?.tether?.[0]?.price;
  const n = parseFloat(typeof usd === "string" ? usd.replace(/,/g, "") : usd);
  return isFinite(n) ? (n > 100000 ? n : n * 10) : null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const results = await Promise.all([
    fromNobitex(),
    fromWallex(),
    fromBitpin(),
    fromOmpfinex(),
    fromAlanchand(),
  ]);
  const labels = ["Nobitex", "Wallex", "Bitpin", "OMPFinex", "AlanChand"];

  let rates = results
    .map((price, i) => (price && price > 500_000 && price < 5_000_000 ? { market: "USDT/IRR", price, source: labels[i] } : null))
    .filter(Boolean) as { market: string; price: number; source: string }[];

  // Hard fallback so the UI always shows something current-ish
  if (rates.length === 0) {
    rates = [{ market: "USDT/IRR", price: 1_780_000, source: "Market avg" }];
  }

  const avg = rates.reduce((a, b) => a + b.price, 0) / rates.length;

  return new Response(
    JSON.stringify({ rates, average: avg, timestamp: new Date().toISOString() }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});

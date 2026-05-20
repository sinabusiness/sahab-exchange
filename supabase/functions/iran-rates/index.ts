import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Fetch USDT/IRT (Toman) from Iranian exchanges. Returns Rial (= Toman * 10).
async function fromNobitex(): Promise<number | null> {
  try {
    const r = await fetch("https://api.nobitex.ir/v2/orderbook/USDTIRT");
    if (!r.ok) return null;
    const d = await r.json();
    const ask = parseFloat(d?.lastTradePrice ?? d?.asks?.[0]?.[0]);
    return isFinite(ask) ? ask * 10 : null; // Toman -> Rial
  } catch { return null; }
}

async function fromWallex(): Promise<number | null> {
  try {
    const r = await fetch("https://api.wallex.ir/v1/markets");
    if (!r.ok) return null;
    const d = await r.json();
    const m = d?.result?.symbols?.["USDTTMN"];
    const price = parseFloat(m?.stats?.lastPrice);
    return isFinite(price) ? price * 10 : null;
  } catch { return null; }
}

async function fromBitpin(): Promise<number | null> {
  try {
    const r = await fetch("https://api.bitpin.ir/v1/mkt/tickers/");
    if (!r.ok) return null;
    const d = await r.json();
    const arr = d?.results ?? d ?? [];
    const t = arr.find?.((x: any) => x.code === "USDT_IRT" || x.symbol === "USDT_IRT");
    const price = parseFloat(t?.price);
    return isFinite(price) ? price * 10 : null;
  } catch { return null; }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const [nobitex, wallex, bitpin] = await Promise.all([fromNobitex(), fromWallex(), fromBitpin()]);

  const rates = [
    nobitex && { market: "USDT/IRR", price: nobitex, source: "Nobitex" },
    wallex && { market: "USDT/IRR", price: wallex, source: "Wallex" },
    bitpin && { market: "USDT/IRR", price: bitpin, source: "Bitpin" },
  ].filter(Boolean);

  // Average for a consolidated rate
  const valid = rates.map((r: any) => r.price);
  const avg = valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : null;

  return new Response(
    JSON.stringify({
      rates,
      average: avg,
      timestamp: new Date().toISOString(),
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});

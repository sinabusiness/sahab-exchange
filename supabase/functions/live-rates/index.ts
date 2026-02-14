import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fetch crypto from CoinGecko (free, no key)
    const cryptoRes = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,ripple,binancecoin,solana&order=market_cap_desc&sparkline=false"
    );
    const cryptoData = cryptoRes.ok ? await cryptoRes.json() : [];

    // Fetch fiat rates from exchangerate.host (free, no key)
    const fiatRes = await fetch(
      "https://open.er-api.com/v6/latest/USD"
    );
    const fiatData = fiatRes.ok ? await fiatRes.json() : null;

    const fiatRates = fiatData?.rates || {};

    return new Response(
      JSON.stringify({
        crypto: cryptoData,
        fiat: {
          AED: fiatRates.AED || 3.67,
          SAR: fiatRates.SAR || 3.75,
          KWD: fiatRates.KWD || 0.31,
          QAR: fiatRates.QAR || 3.64,
          BHD: fiatRates.BHD || 0.376,
          OMR: fiatRates.OMR || 0.385,
          EGP: fiatRates.EGP || 50.5,
          IRR: fiatRates.IRR || 42000,
          IQD: fiatRates.IQD || 1310,
          TRY: fiatRates.TRY || 36.2,
        },
        metals: {
          gold: { price: 2935, change: 0.8 },
          silver: { price: 32.5, change: -0.3 },
        },
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch rates" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

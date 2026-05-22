import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const CRYPTO_IDS: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
  XRP: "ripple",
  BNB: "binancecoin",
  SOL: "solana",
};

const FIAT_ALLOWED = new Set([
  "USD", "AED", "SAR", "KWD", "QAR", "BHD", "OMR",
  "EGP", "IRR", "IQD", "TRY",
]);

const ALL_ALLOWED = new Set<string>([
  ...Object.keys(CRYPTO_IDS),
  ...FIAT_ALLOWED,
]);

async function getUsdRates() {
  const [cryptoRes, fiatRes] = await Promise.all([
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,ripple,binancecoin,solana"
    ),
    fetch("https://open.er-api.com/v6/latest/USD"),
  ]);
  const cryptoArr = cryptoRes.ok ? await cryptoRes.json() : [];
  const fiatJson = fiatRes.ok ? await fiatRes.json() : null;
  const fiat = fiatJson?.rates ?? {};

  // priceUsd: how many USD per 1 unit of the asset
  const priceUsd: Record<string, number> = { USD: 1 };
  for (const [sym, id] of Object.entries(CRYPTO_IDS)) {
    const c = cryptoArr.find((x: any) => x.id === id);
    if (c?.current_price) priceUsd[sym] = Number(c.current_price);
  }
  for (const code of FIAT_ALLOWED) {
    if (code === "USD") continue;
    const r = Number(fiat[code]);
    if (r > 0) priceUsd[code] = 1 / r;
  }
  return priceUsd;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const user = userData.user;

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const orderType = body.order_type;
    const fromCurrency = String(body.from_currency ?? "").toUpperCase();
    const toCurrency = String(body.to_currency ?? "").toUpperCase();
    const amount = Number(body.amount);
    const notes = body.notes ? String(body.notes).slice(0, 500) : null;

    if (orderType !== "buy" && orderType !== "sell") {
      return new Response(JSON.stringify({ error: "Invalid order type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!ALL_ALLOWED.has(fromCurrency) || !ALL_ALLOWED.has(toCurrency)) {
      return new Response(JSON.stringify({ error: "Unsupported currency" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (fromCurrency === toCurrency) {
      return new Response(JSON.stringify({ error: "Currencies must differ" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!Number.isFinite(amount) || amount <= 0 || amount > 1e12) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const priceUsd = await getUsdRates();
    const fromUsd = priceUsd[fromCurrency];
    const toUsd = priceUsd[toCurrency];
    if (!fromUsd || !toUsd) {
      return new Response(JSON.stringify({ error: "Rate unavailable" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const rate = fromUsd / toUsd;
    const total = amount * rate;
    if (!Number.isFinite(rate) || rate <= 0 || !Number.isFinite(total) || total <= 0) {
      return new Response(JSON.stringify({ error: "Computation error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const { data, error } = await admin
      .from("orders")
      .insert({
        user_id: user.id,
        order_type: orderType,
        from_currency: fromCurrency,
        to_currency: toCurrency,
        amount,
        rate,
        total,
        notes,
      })
      .select()
      .single();

    if (error) {
      console.error("Order insert failed", error);
      return new Response(JSON.stringify({ error: "Failed to create order" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ order: data }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-order error", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

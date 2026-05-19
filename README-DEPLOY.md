# Deploying صراف to صراف.com (Free / Cheap Stack)

This guide deploys the full app — frontend, database, auth, and the `live-rates` edge function — on free or near-free services.

**Total cost:** domain (~$10/yr) + everything else **$0** on free tiers.

---

## Stack Overview

| Layer | Service | Cost |
|---|---|---|
| Frontend (React/Vite) | **Cloudflare Pages** | Free (unlimited bandwidth) |
| Database + Auth + Edge Functions | **Lovable Cloud** *(already configured)* or self-host Supabase | Free tier |
| Live rate APIs | CoinGecko + open.er-api.com + gold-api.com | Free, no key |
| Domain | صراف.com (you own it) | ~$10/yr |
| DNS + SSL | Cloudflare | Free |

---

## Option A — Easiest: Publish on Lovable + connect صراف.com

1. Click **Publish** (top-right of editor). App goes live at `sarraf-connect-hub.lovable.app`.
2. Open **Project Settings → Domains → Connect Domain**.
3. Enter `صراف.com` (Punycode: `xn--mgbx4cd0ab.com`).
4. At your domain registrar, add the DNS records Lovable shows you:
   - **A** record `@` → `185.158.133.1`
   - **A** record `www` → `185.158.133.1`
   - **TXT** record `_lovable` → value shown in dialog
5. Wait 5 min – 72 h for DNS + automatic SSL.
6. Done. Backend (auth, DB, `live-rates`) keeps running on Lovable Cloud.

This is the recommended path — zero ops, free.

---

## Option B — Cloudflare Pages frontend + Lovable Cloud backend

Use this if you want CDN-edge hosting under your own Cloudflare account.

### 1. Export code to GitHub
- Top-right GitHub icon in the Lovable editor → **Connect to GitHub** → create repo.

### 2. Create the Cloudflare Pages project
- cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**.
- Pick the repo.
- Build settings:
  - Framework preset: **Vite**
  - Build command: `npm run build`
  - Build output: `dist`
- Environment variables (copy from `.env`):
  ```
  VITE_SUPABASE_URL=https://hzitehnpxtiesilfugcp.supabase.co
  VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOi...   (the value already in .env)
  VITE_SUPABASE_PROJECT_ID=hzitehnpxtiesilfugcp
  ```
- Deploy. You'll get `sarraf.pages.dev`.

### 3. Add صراف.com to Cloudflare
- Cloudflare dashboard → **Add Site** → `xn--mgbx4cd0ab.com` (or paste صراف.com, it converts automatically).
- Cloudflare gives you 2 nameservers. Go to your registrar (where you bought the domain) and **replace its nameservers** with Cloudflare's.
- Wait for DNS to switch (minutes to hours).

### 4. Attach domain to Pages
- In the Pages project → **Custom domains → Set up a custom domain** → enter `xn--mgbx4cd0ab.com` and also `www.xn--mgbx4cd0ab.com`.
- Cloudflare auto-creates DNS + SSL. No A records to manage manually.

SPA deep-link routing and HTTPS work automatically.

---

## Option C — Self-host Supabase backend (optional, for full control)

Only do this if you want to leave Lovable Cloud. Otherwise skip.

### Cheapest VPS: Hetzner CX22 (~$4/mo) or free Supabase.com tier

**Self-host Docker route:**
```bash
git clone --depth 1 https://github.com/supabase/supabase
cd supabase/docker
cp .env.example .env   # edit POSTGRES_PASSWORD, JWT_SECRET, ANON_KEY, SERVICE_ROLE_KEY
docker compose up -d
```

**Apply migrations:**
```bash
psql "postgres://postgres:PASSWORD@YOUR_VPS:5432/postgres" \
  -f supabase/migrations/*.sql
```

**Deploy the edge function:**
```bash
npx supabase login
npx supabase link --project-ref YOUR_REF
npx supabase functions deploy live-rates --no-verify-jwt
```

**Enable email auth + verification** in Supabase Studio → Auth → Providers → Email → require email confirmation.

**Update the frontend `.env`** with your new `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (the anon key from your self-hosted instance), then redeploy Cloudflare Pages.

---

## Live data sources (already wired in code)

| Data | Endpoint | Refresh |
|---|---|---|
| Crypto prices | `https://api.coingecko.com/api/v3/coins/markets` | 60 s |
| Fiat FX rates | `https://open.er-api.com/v6/latest/USD` | 5 min |
| Gold/Silver | `https://api.gold-api.com/price/XAU` and `/XAG` | 5 min |

All three are free and require **no API key**. If any goes down, the app falls back to the May 17, 2026 baseline values bundled in `src/hooks/useCryptoRates.ts`.

---

## Recommended path for you

**Use Option A.** One click, free, your domain works in minutes, and the backend (`live-rates` function, database, auth) keeps running with zero setup. Switch to Option B or C later only if you outgrow Lovable Cloud's free tier.

# 🚀 Deploy صراف.com — 100% Free Forever

Everything below stays **$0/month**. Your only cost is the domain itself (~$10/year — and صراف.com you already own).

---

## 📦 What you're shipping

| Piece | Where it runs | Cost |
|---|---|---|
| Frontend (React app) | **Cloudflare Pages** | Free, unlimited bandwidth |
| Database + Auth + Storage | **Supabase Free tier** (already set up as Lovable Cloud) | Free up to 500 MB DB, 50k MAU |
| Edge functions (`live-rates`, `iran-rates`) | Supabase Edge Functions | Free up to 500k invocations/mo |
| Live price APIs (CoinGecko, gold-api, er-api, Nobitex…) | Public APIs | Free, no key |
| Domain `صراف.com` | Your registrar | already paid |
| DNS + SSL | Cloudflare | Free |
| Lovable badge | Removed (see step 6) | Free |

Free-tier limits are more than enough for a launching exchange site. You can run thousands of daily users before hitting a paid tier.

---

## STEP 1 — Push the code to GitHub (free)

In the Lovable editor:
1. Top-right ➜ **GitHub** icon ➜ **Connect to GitHub**
2. Authorize the Lovable GitHub App
3. Click **Create Repository** → name it `sarraf` (or anything)

Done. Every change you make in Lovable now auto-syncs to GitHub, and vice-versa.

---

## STEP 2 — Keep using Supabase for backend (free)

Your backend is **already live** on Supabase free tier via Lovable Cloud. You don't have to move it. Project ref: `hzitehnpxtiesilfugcp`.

What's already configured for you:
- ✅ Tables: `profiles`, `orders` (with RLS policies — users only see their own data)
- ✅ Auth: email + password, **email confirmation required**, demo account `demo@sarraf.app` / `Demo123456!`
- ✅ Edge functions: `live-rates`, `iran-rates` (deployed, no JWT required, run for free)
- ✅ Secrets: `LOVABLE_API_KEY` (for AI), Supabase service keys

You don't need to touch any of this. It keeps running even after you move the frontend to Cloudflare. The `.env` keys are public (publishable/anon) so it's safe to ship them in the build.

> ⚠️ If you ever want to leave Lovable Cloud entirely, see the bottom **Self-host Supabase** section.

---

## STEP 3 — Deploy the frontend on Cloudflare Pages (free)

1. Go to **https://dash.cloudflare.com** → sign up (free).
2. Left sidebar → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize Cloudflare to read your GitHub → pick the `sarraf` repo.
4. Build settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** *(leave empty)*
5. **Environment variables** (click "Add variable", repeat for all 3 — copy values from your Lovable project `.env`):
   ```
   VITE_SUPABASE_URL              = https://hzitehnpxtiesilfugcp.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY  = eyJhbGciOi…  (the full value in .env)
   VITE_SUPABASE_PROJECT_ID       = hzitehnpxtiesilfugcp
   ```
6. **Save and Deploy.** First build takes ~2 min. You'll get a URL like `sarraf.pages.dev`.

I already added `public/_redirects` so deep links (e.g. `/dashboard`) work after refresh on Cloudflare. No extra config needed.

---

## STEP 4 — Connect صراف.com (free SSL + DNS via Cloudflare)

### 4a. Add the site to Cloudflare
1. Cloudflare dashboard → **Add a site** → type `صراف.com` (it auto-converts to Punycode `xn--mgbtl4c.com`).
2. Pick the **Free** plan.
3. Cloudflare gives you **2 nameservers** (something like `xxx.ns.cloudflare.com`).
4. Log in to **your domain registrar** (wherever you bought صراف.com) → **change the nameservers** to the two Cloudflare gave you.
5. Wait 5 min – 24 h for Cloudflare to confirm the switch (you'll get an email).

### 4b. Point the domain to your Pages site
1. In Cloudflare → Workers & Pages → your `sarraf` project → **Custom domains** → **Set up a custom domain**.
2. Enter `xn--mgbtl4c.com` (the Punycode form of صراف.com). Click Continue. Cloudflare auto-creates the DNS record + SSL certificate.
3. Repeat for `www.xn--mgbtl4c.com` so `www.صراف.com` also works.

Within a few minutes صراف.com is live with HTTPS. ✅

### 4c. Tell Supabase Auth about the new domain (so signup-confirmation emails work)
This is **critical** — it's why your last confirmation link broke.

Inside Lovable, just tell me **"add صراف.com to allowed redirect URLs"** and I'll do it via migration. Or do it yourself:
1. Open Lovable → **Cloud** (sidebar) → **Users** → **URL Configuration**.
2. **Site URL:** `https://صراف.com`
3. **Redirect URLs** (add each one):
   ```
   https://صراف.com/**
   https://www.صراف.com/**
   https://xn--mgbtl4c.com/**
   https://www.xn--mgbtl4c.com/**
   https://sarraf.pages.dev/**
   ```

Now the confirmation email link will open the real site instead of failing.

---

## STEP 5 — Email confirmation: keep it FREE

Supabase free tier sends auth emails (signup confirmation, password reset) **for you, for free**, from `noreply@mail.app.supabase.io`. No setup needed. They land in the inbox most of the time but say "via supabase.io".

If you want emails to come from `@صراف.com` instead, you have 2 free paths:
- **Resend.com free tier** — 100 emails/day, 3,000/month free. Plug it into Supabase Auth → SMTP settings.
- **Brevo (ex-Sendinblue)** — 300 emails/day free forever. Same SMTP setup.

Both require verifying your domain via DNS (TXT records you add in Cloudflare — also free). Tell me when you want to wire this up and I'll generate the exact records.

---

## STEP 6 — Remove the "Edit with Lovable" badge

The badge is **only on the lovable.app preview/published URL**. When you serve the site from **Cloudflare Pages on صراف.com, the badge does not appear at all** — Cloudflare is just hosting your built JS, with no Lovable runtime injection. So just by following Step 3+4 you already have a 100% clean site, no badge.

(If you ever publish the lovable.app URL too and want the badge gone there as well, hiding the badge requires Lovable Pro. Cloudflare path stays free.)

---

## STEP 7 — Updating the site after launch

Just edit in Lovable as normal. Every change syncs to GitHub automatically. Cloudflare Pages watches GitHub and rebuilds in ~90 seconds. **Zero clicks needed from you after the first setup.**

---

## ✅ Final checklist

- [ ] Connected GitHub from Lovable
- [ ] Created Cloudflare account
- [ ] Created Pages project pointing at the repo, with the 3 env vars
- [ ] Added صراف.com to Cloudflare (nameservers switched)
- [ ] Attached custom domain to the Pages project
- [ ] Added صراف.com to Supabase Auth redirect URLs (Cloud → Users → URL Configuration)
- [ ] Opened https://صراف.com — works with HTTPS, no Lovable badge

That's it. Site is yours, free, on your domain. 🎉

---

## 🆘 If you ever outgrow the free tier

| Limit hit | Free workaround | Paid (cheapest) |
|---|---|---|
| Supabase 500 MB DB | Prune old `orders` | $25/mo Supabase Pro |
| 50k monthly users | — | $25/mo Supabase Pro |
| Email volume | Switch to Brevo (300/day free) | Resend $20/mo |
| CDN bandwidth | Cloudflare = unlimited free | n/a |

You will likely never pay anything until the site is profitable. Good luck — go ship it. 🫶

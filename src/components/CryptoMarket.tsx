import { useState, useMemo } from "react";
import { useCoinMarketData } from "@/hooks/useMarketData";
import { useT, useLang } from "@/i18n/useLang";
import {
  TrendingUp,
  TrendingDown,
  Loader2,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formatPrice = (price: number) => {
  if (price >= 1000) return price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1) return price.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (price >= 0.001) return price.toLocaleString("en-US", { maximumFractionDigits: 4 });
  return price.toLocaleString("en-US", { maximumFractionDigits: 8 });
};

const formatMarketCap = (cap: number) => {
  if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
  if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`;
  if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`;
  return `$${cap.toLocaleString()}`;
};

const formatVolume = (vol: number) => {
  if (vol >= 1e9) return `$${(vol / 1e9).toFixed(2)}B`;
  if (vol >= 1e6) return `$${(vol / 1e6).toFixed(2)}M`;
  return `$${vol.toLocaleString()}`;
};

const PER_PAGE = 20;

type SortKey = "market_cap_rank" | "name" | "price" | "change1h" | "change24h" | "change7d" | "volume" | "market_cap";
type SortDir = "asc" | "desc";

interface CoinRow {
  market_cap_rank: number;
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h: number | null;
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

export default function CryptoMarket() {
  const t = useT();
  const { dir } = useLang();
  const { data: coins, isLoading } = useCoinMarketData();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("market_cap_rank");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sahab_favorites");
        if (saved) return new Set(JSON.parse(saved));
      } catch { /* ignore */ }
    }
    return new Set<string>();
  });
  const [showFavorites, setShowFavorites] = useState(false);

  const rankedCoins: CoinRow[] = useMemo(() => {
    return (coins || []).map((c, i) => ({ ...c, market_cap_rank: i + 1 }));
  }, [coins]);

  const filtered = useMemo(() => {
    let list = rankedCoins;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));
    }
    if (showFavorites) list = list.filter((c) => favorites.has(c.id));

    return [...list].sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;
      switch (sortKey) {
        case "market_cap_rank": aVal = a.market_cap_rank; bVal = b.market_cap_rank; break;
        case "name": aVal = a.name.toLowerCase(); bVal = b.name.toLowerCase();
          return sortDir === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
        case "price": aVal = a.current_price; bVal = b.current_price; break;
        case "change1h": aVal = a.price_change_percentage_1h_in_currency ?? 0; bVal = b.price_change_percentage_1h_in_currency ?? 0; break;
        case "change24h": aVal = a.price_change_percentage_24h ?? 0; bVal = b.price_change_percentage_24h ?? 0; break;
        case "change7d": aVal = a.price_change_percentage_7d_in_currency ?? 0; bVal = b.price_change_percentage_7d_in_currency ?? 0; break;
        case "volume": aVal = a.total_volume; bVal = b.total_volume; break;
        case "market_cap": aVal = a.market_cap; bVal = b.market_cap; break;
        default: aVal = a.market_cap_rank; bVal = b.market_cap_rank;
      }
      if (typeof aVal === "number" && typeof bVal === "number") return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      return 0;
    });
  }, [rankedCoins, search, sortKey, sortDir, showFavorites, favorites]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir(key === "market_cap_rank" ? "asc" : "desc"); }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { localStorage.setItem("sahab_favorites", JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  const sh = (key: SortKey, label: string, className?: string) => (
    <button onClick={() => toggleSort(key)}
      className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap ${className || ""}`}>
      {label}
      <ArrowUpDown className="w-3 h-3" />
      {sortKey === key && <span className="text-primary">{sortDir === "asc" ? "\u2191" : "\u2193"}</span>}
    </button>
  );

  return (
    <section id="market" className="py-16 sm:py-20 px-4 overflow-hidden" dir={dir}>
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gold-text">{t("market.title")}</h2>
          <p className="text-muted-foreground">{t("market.sub")}</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder={t("market.search")} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9 bg-card border-border" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <Button variant={showFavorites ? "default" : "secondary"} size="sm" onClick={() => { setShowFavorites(!showFavorites); setPage(1); }}
              className={`shrink-0 ${showFavorites ? "gold-gradient text-primary-foreground" : ""}`}>
              <Star className={`w-4 h-4 mr-1 ${showFavorites ? "fill-current" : ""}`} />
              {t("market.watchlist")}
              {favorites.size > 0 && <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">{favorites.size}</Badge>}
            </Button>
            <Select value={`${sortKey}-${sortDir}`} onValueChange={(v) => { const [k, d] = v.split("-") as [SortKey, SortDir]; setSortKey(k); setSortDir(d); }}>
              <SelectTrigger className="w-[140px] shrink-0 bg-card border-border"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="market_cap_rank-asc">{t("market.rank")}</SelectItem>
                <SelectItem value="name-asc">{t("market.name")}</SelectItem>
                <SelectItem value="price-desc">{t("market.price")}</SelectItem>
                <SelectItem value="change1h-desc">{t("market.h1")}</SelectItem>
                <SelectItem value="change24h-desc">{t("market.h24")}</SelectItem>
                <SelectItem value="change7d-desc">{t("market.d7")}</SelectItem>
                <SelectItem value="volume-desc">{t("market.volume")}</SelectItem>
                <SelectItem value="market_cap-desc">{t("market.mcap")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-muted-foreground">
          <span><strong className="text-foreground">{filtered.length}</strong> {t("market.coinPerPage")}</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-positive inline-block" />
            {t("market.updated")}
          </span>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            {showFavorites ? t("market.noWatchlist") : t("market.noCoins")}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-3 py-3 text-left w-10"><Star className="w-3.5 h-3.5 text-muted-foreground mx-auto" /></th>
                      <th className="px-3 py-3 text-left">{sh("market_cap_rank", "#", "w-8")}</th>
                      <th className="px-3 py-3 text-left">{sh("name", t("market.name"))}</th>
                      <th className="px-3 py-3 text-right">{sh("price", t("market.price"))}</th>
                      <th className="px-3 py-3 text-right hidden md:table-cell">{sh("change1h", t("market.h1"))}</th>
                      <th className="px-3 py-3 text-right">{sh("change24h", t("market.h24"))}</th>
                      <th className="px-3 py-3 text-right hidden lg:table-cell">{sh("change7d", t("market.d7"))}</th>
                      <th className="px-3 py-3 text-right hidden lg:table-cell">{sh("volume", t("market.volume"))}</th>
                      <th className="px-3 py-3 text-right hidden lg:table-cell">{sh("market_cap", t("market.mcap"))}</th>
                      <th className="px-3 py-3 text-center hidden xl:table-cell w-28">{t("market.sparkline")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((coin) => (
                      <tr key={coin.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors group">
                        <td className="px-3 py-3">
                          <button onClick={() => toggleFavorite(coin.id)} className="opacity-30 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                            aria-label={favorites.has(coin.id) ? `Remove ${coin.name}` : `Add ${coin.name}`}>
                            <Star className={`w-3.5 h-3.5 ${favorites.has(coin.id) ? "fill-primary text-primary opacity-100" : "text-muted-foreground"}`} />
                          </button>
                        </td>
                        <td className="px-3 py-3 text-sm text-muted-foreground">{coin.market_cap_rank}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2.5">
                            <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full shrink-0" loading="lazy" />
                            <div>
                              <div className="font-semibold text-foreground text-sm">{coin.name}</div>
                              <div className="text-xs text-muted-foreground uppercase">{coin.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-right font-semibold text-sm" dir="ltr">${formatPrice(coin.current_price)}</td>
                        <td className={`px-3 py-3 text-right text-sm hidden md:table-cell ${(coin.price_change_percentage_1h_in_currency ?? 0) >= 0 ? "rate-positive" : "rate-negative"}`} dir="ltr">
                          {coin.price_change_percentage_1h_in_currency != null ? `${coin.price_change_percentage_1h_in_currency >= 0 ? "+" : ""}${coin.price_change_percentage_1h_in_currency.toFixed(2)}%` : "\u2014"}
                        </td>
                        <td className={`px-3 py-3 text-right text-sm font-medium ${(coin.price_change_percentage_24h ?? 0) >= 0 ? "rate-positive" : "rate-negative"}`} dir="ltr">
                          <div className="flex items-center justify-end gap-1">
                            {(coin.price_change_percentage_24h ?? 0) >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {((coin.price_change_percentage_24h ?? 0) >= 0 ? "+" : "")}{(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                          </div>
                        </td>
                        <td className={`px-3 py-3 text-right text-sm hidden lg:table-cell ${(coin.price_change_percentage_7d_in_currency ?? 0) >= 0 ? "rate-positive" : "rate-negative"}`} dir="ltr">
                          {coin.price_change_percentage_7d_in_currency != null ? `${coin.price_change_percentage_7d_in_currency >= 0 ? "+" : ""}${coin.price_change_percentage_7d_in_currency.toFixed(2)}%` : "\u2014"}
                        </td>
                        <td className="px-3 py-3 text-right text-sm hidden lg:table-cell text-muted-foreground" dir="ltr">{formatVolume(coin.total_volume)}</td>
                        <td className="px-3 py-3 text-right text-sm hidden lg:table-cell text-muted-foreground" dir="ltr">{formatMarketCap(coin.market_cap)}</td>
                        <td className="px-3 py-3 hidden xl:table-cell">
                          <Sparkline data={coin.sparkline_in_7d?.price} positive={(coin.price_change_percentage_24h ?? 0) >= 0} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden space-y-3">
              {paginated.map((coin) => (
                <div key={coin.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full shrink-0" loading="lazy" />
                      <div>
                        <div className="font-semibold text-foreground text-sm">{coin.name}</div>
                        <div className="text-xs text-muted-foreground uppercase">{coin.symbol}</div>
                      </div>
                    </div>
                    <button onClick={() => toggleFavorite(coin.id)} className="p-1">
                      <Star className={`w-4 h-4 ${favorites.has(coin.id) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-foreground" dir="ltr">${formatPrice(coin.current_price)}</div>
                    <div className={`flex items-center gap-1 text-sm font-semibold ${(coin.price_change_percentage_24h ?? 0) >= 0 ? "rate-positive" : "rate-negative"}`} dir="ltr">
                      {(coin.price_change_percentage_24h ?? 0) >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {((coin.price_change_percentage_24h ?? 0) >= 0 ? "+" : "")}{(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span dir="ltr">{t("market.volume")}: {formatVolume(coin.total_volume)}</span>
                    <span dir="ltr">{t("market.mcap")}: {formatMarketCap(coin.market_cap)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4">
              <Button variant="secondary" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {page} / {totalPages}
              </span>
              <Button variant="secondary" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="hidden sm:flex items-center justify-center gap-1 mt-2">
              {(() => {
                const pages: (number | "...")[] = [];
                if (totalPages <= 7) {
                  for (let i = 1; i <= totalPages; i++) pages.push(i);
                } else {
                  pages.push(1);
                  if (page > 3) pages.push("...");
                  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
                  if (page < totalPages - 2) pages.push("...");
                  pages.push(totalPages);
                }
                return pages.map((p, idx) =>
                  p === "..." ? (
                    <span key={`e${idx}`} className="text-muted-foreground px-1">…</span>
                  ) : (
                    <Button key={p} variant={page === p ? "default" : "secondary"} size="sm" onClick={() => setPage(p)}
                      className={`min-w-[32px] h-8 text-xs ${page === p ? "gold-gradient text-primary-foreground" : ""}`}>{p}</Button>
                  )
                );
              })()}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Sparkline({ data, positive }: { data?: number[]; positive: boolean }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 32;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  const color = positive ? "hsl(145, 63%, 42%)" : "hsl(0, 72%, 51%)";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

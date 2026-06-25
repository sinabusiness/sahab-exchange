import { useEffect, useRef } from 'react';
import { createChart, ColorType, CrosshairMode, CandlestickSeries, HistogramSeries } from 'lightweight-charts';
import { apiUrl } from '../lib/gate';

interface Props {
  symbol: string;
  basePrice: number;
  timeframe: string;
}

const intervalMap: Record<string, string> = {
  '1m': '1min', '5m': '5min', '15m': '15min', '30m': '30min',
  '1h': '1hour', '4h': '4hour', '1d': '1day', '1w': '1week',
};

export default function Chart({ symbol, basePrice, timeframe }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<any>(null);
  const volumeRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#7a8599',
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: 'rgba(255,255,255,0.04)' },
        horzLines: { color: 'rgba(255,255,255,0.04)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: 'rgba(0,212,170,0.3)', width: 1, style: 2 },
        horzLine: { color: 'rgba(0,212,170,0.3)', width: 1, style: 2 },
      },
      rightPriceScale: {
        borderColor: 'rgba(255,255,255,0.06)',
        scaleMargins: { top: 0.1, bottom: 0.25 },
      },
      timeScale: {
        borderColor: 'rgba(255,255,255,0.06)',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: { vertTouchDrag: false },
    });

    chartRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#00d4aa',
      downColor: '#ef4444',
      borderUpColor: '#00d4aa',
      borderDownColor: '#ef4444',
      wickUpColor: '#00d4aa',
      wickDownColor: '#ef4444',
    });

    seriesRef.current = candleSeries;

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: '',
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    volumeRef.current = volumeSeries;

    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        chart.applyOptions({ width, height });
      }
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [symbol, basePrice]);

  useEffect(() => {
    if (!seriesRef.current || !volumeRef.current) return;

    const toobitSymbol = symbol.replace('/', '_').toLowerCase();
    const interval = intervalMap[timeframe] || '1hour';

    fetch(apiUrl(`/api/market/candles/${toobitSymbol}?interval=${interval}&size=200`))
      .then(r => r.json())
      .then((data: any) => {
        // LBank returns array of arrays: [[timestamp, open, high, low, close, volume], ...]
        const candlesArr = Array.isArray(data) ? data : (data?.data || data?.candles || []);
        if (candlesArr.length === 0) return;

        const first = candlesArr[0];
        // Determine format based on first element
        let candles: any[], volumes: any[];

        if (Array.isArray(first)) {
          // Array format: [timestamp, open, high, low, close, volume]
          candles = candlesArr.map((k: any[]) => ({
            time: parseInt(k[0]) as any,
            open: parseFloat(k[1]),
            high: parseFloat(k[2]),
            low: parseFloat(k[3]),
            close: parseFloat(k[4]),
          }));
          volumes = candlesArr.map((k: any[]) => ({
            time: parseInt(k[0]) as any,
            value: parseFloat(k[5]),
            color: parseFloat(k[4]) >= parseFloat(k[1]) ? 'rgba(0,212,170,0.25)' : 'rgba(239,68,68,0.25)',
          }));
        } else {
          // Object format: { timestamp, open, high, low, close, volume }
          candles = candlesArr.map((k: any) => ({
            time: parseInt(k.timestamp || k.time || k[0]) as any,
            open: parseFloat(k.open || k[1]),
            high: parseFloat(k.high || k[2]),
            low: parseFloat(k.low || k[3]),
            close: parseFloat(k.close || k[4]),
          }));
          volumes = candlesArr.map((k: any) => ({
            time: parseInt(k.timestamp || k.time || k[0]) as any,
            value: parseFloat(k.volume || k.vol || k[5]),
            color: parseFloat(k.close || k[4]) >= parseFloat(k.open || k[1]) ? 'rgba(0,212,170,0.25)' : 'rgba(239,68,68,0.25)',
          }));
        }

        seriesRef.current.setData(candles);
        volumeRef.current.setData(volumes);
        chartRef.current?.timeScale().fitContent();
      })
      .catch(() => {
        const candles = generateFallbackCandles(200, basePrice, interval);
        const volumes = candles.map(c => ({
          time: c.time,
          value: Math.floor(Math.random() * 500 + 100),
          color: c.close >= c.open ? 'rgba(0,212,170,0.25)' : 'rgba(239,68,68,0.25)',
        }));
        seriesRef.current.setData(candles);
        volumeRef.current.setData(volumes);
        chartRef.current?.timeScale().fitContent();
      });
  }, [symbol, basePrice, timeframe]);

  return <div ref={containerRef} className="w-full h-full" />;
}

function generateFallbackCandles(count: number, basePrice: number, interval: string) {
  const data = [];
  let time = Math.floor(Date.now() / 1000);
  let price = basePrice;

  const intervalSeconds: Record<string, number> = {
    '1m': 60, '5m': 300, '15m': 900, '1h': 3600, '4h': 14400, '1d': 86400, '1w': 604800,
  };
  const step = intervalSeconds[interval] || 3600;

  for (let i = 0; i < count; i++) {
    const volatility = basePrice * 0.015;
    const change = (Math.random() - 0.48) * volatility;

    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;

    data.push({
      time: (time - (count - i) * step) as any,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });

    price = close;
  }

  return data;
}

export interface CoinData {
  symbol: string;
  name: string;
  icon: string;
  lbankSymbol: string;
  color: string;
}

export const defaultCoins: CoinData[] = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿', lbankSymbol: 'btc_usdt', color: '#f7931a' },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', lbankSymbol: 'eth_usdt', color: '#627eea' },
  { symbol: 'SOL', name: 'Solana', icon: '◎', lbankSymbol: 'sol_usdt', color: '#9945ff' },
  { symbol: 'BNB', name: 'BNB', icon: '◆', lbankSymbol: 'bnb_usdt', color: '#f3ba2f' },
  { symbol: 'XRP', name: 'XRP', icon: '✕', lbankSymbol: 'xrp_usdt', color: '#00aae4' },
  { symbol: 'ADA', name: 'Cardano', icon: '♦', lbankSymbol: 'ada_usdt', color: '#0033ad' },
  { symbol: 'DOGE', name: 'Dogecoin', icon: 'Ð', lbankSymbol: 'doge_usdt', color: '#c2a633' },
  { symbol: 'AVAX', name: 'Avalanche', icon: '▲', lbankSymbol: 'avax_usdt', color: '#e84142' },
  { symbol: 'DOT', name: 'Polkadot', icon: '●', lbankSymbol: 'dot_usdt', color: '#e6007a' },
  { symbol: 'LINK', name: 'Chainlink', icon: '⬡', lbankSymbol: 'link_usdt', color: '#2a5ada' },
  { symbol: 'MATIC', name: 'Polygon', icon: '⬟', lbankSymbol: 'matic_usdt', color: '#8247e5' },
  { symbol: 'UNI', name: 'Uniswap', icon: '🦄', lbankSymbol: 'uni_usdt', color: '#ff007a' },
  { symbol: 'ATOM', name: 'Cosmos', icon: '⚛', lbankSymbol: 'atom_usdt', color: '#2e3148' },
  { symbol: 'LTC', name: 'Litecoin', icon: 'Ł', lbankSymbol: 'ltc_usdt', color: '#bfbbbb' },
  { symbol: 'TON', name: 'Toncoin', icon: '💎', lbankSymbol: 'ton_usdt', color: '#0098ea' },
  { symbol: 'SUI', name: 'Sui', icon: 'S', lbankSymbol: 'sui_usdt', color: '#6fbcf0' },
  { symbol: 'PEPE', name: 'Pepe', icon: '🐸', lbankSymbol: 'pepe_usdt', color: '#3e7d32' },
  { symbol: 'SHIB', name: 'Shiba Inu', icon: '🐕', lbankSymbol: 'shib_usdt', color: '#ffa409' },
  { symbol: 'XLM', name: 'Stellar', icon: '✦', lbankSymbol: 'xlm_usdt', color: '#14b6e7' },
  { symbol: 'TRX', name: 'TRON', icon: '△', lbankSymbol: 'trx_usdt', color: '#ff0013' },
  { symbol: 'NEAR', name: 'NEAR', icon: 'Ⓝ', lbankSymbol: 'near_usdt', color: '#00c08b' },
  { symbol: 'APT', name: 'Aptos', icon: 'A', lbankSymbol: 'apt_usdt', color: '#4cd9c1' },
  { symbol: 'ARB', name: 'Arbitrum', icon: '◎', lbankSymbol: 'arb_usdt', color: '#28a0f0' },
  { symbol: 'OP', name: 'Optimism', icon: 'OP', lbankSymbol: 'op_usdt', color: '#ff0420' },
  { symbol: 'FIL', name: 'Filecoin', icon: '◆', lbankSymbol: 'fil_usdt', color: '#0090ff' },
  { symbol: 'ETC', name: 'Ethereum Classic', icon: 'Ξ', lbankSymbol: 'etc_usdt', color: '#328332' },
  { symbol: 'WIF', name: 'dogwifhat', icon: '🐕', lbankSymbol: 'wif_usdt', color: '#c8a951' },
  { symbol: 'FLOKI', name: 'FLOKI', icon: '🐕', lbankSymbol: 'floki_usdt', color: '#e8443d' },
  { symbol: 'CRO', name: 'Cronos', icon: '◆', lbankSymbol: 'cro_usdt', color: '#002d74' },
  { symbol: 'ALGO', name: 'Algorand', icon: '◉', lbankSymbol: 'algo_usdt', color: '#000000' },
];

const COIN_NAMES: Record<string, string> = {
  BTC: 'Bitcoin', ETH: 'Ethereum', SOL: 'Solana', BNB: 'BNB', XRP: 'XRP',
  ADA: 'Cardano', DOGE: 'Dogecoin', AVAX: 'Avalanche', DOT: 'Polkadot',
  LINK: 'Chainlink', MATIC: 'Polygon', UNI: 'Uniswap', ATOM: 'Cosmos',
  LTC: 'Litecoin', FIL: 'Filecoin', NEAR: 'NEAR', APT: 'Aptos',
  ARB: 'Arbitrum', OP: 'Optimism', SUI: 'Sui', PEPE: 'Pepe',
  WIF: 'dogwifhat', FLOKI: 'FLOKI', SHIB: 'Shiba Inu', TRX: 'TRON',
  ETC: 'Eth Classic', TON: 'Toncoin', XLM: 'Stellar', ALGO: 'Algorand',
  SEI: 'Sei', INJ: 'Injective', TIA: 'Celestia', RENDER: 'Render',
  FET: 'Fetch.ai', RNDR: 'Render', GRT: 'Graph', AAVE: 'Aave',
  MKR: 'Maker', CRV: 'Curve', SNX: 'Synthetix', SAND: 'Sandbox',
  MANA: 'Decentraland', AXS: 'Axie Infinity', EOS: 'EOS', HBAR: 'Hedera',
  ICP: 'Internet Computer', VET: 'VeChain', THETA: 'Theta',
  BAT: 'Basic Attention', COMP: 'Compound', YFI: 'yearn.finance',
  SUSHI: 'SushiSwap', FTM: 'Fantom', ZIL: 'Zilliqa', ENJ: 'Enjin',
  CHZ: 'Chiliz', DYDX: 'dYdX', LDO: 'Lido', FLOW: 'Flow',
  EGLD: 'MultiversX', KAVA: 'Kava', KSM: 'Kusama', ZEC: 'Zcash',
  DASH: 'Dash', NEO: 'NEO', QTUM: 'QTUM', IOTA: 'IOTA', NANO: 'Nano',
  XMR: 'Monero', BSV: 'Bitcoin SV', BCH: 'Bitcoin Cash', STX: 'Stacks',
  IMX: 'Immutable', BLUR: 'Blur', JUP: 'Jupiter', PYTH: 'Pyth',
  W: 'Wormhole', STRK: 'Starknet', MANTA: 'Manta', BONK: 'Bonk',
  WLD: 'Worldcoin', JTO: 'Jito', ORDI: 'ORDI', XTZ: 'Tezos',
};

const COIN_ICONS: Record<string, string> = {
  BTC: '₿', ETH: 'Ξ', SOL: '◎', BNB: '◆', XRP: '✕', ADA: '♦',
  DOGE: 'Ð', AVAX: '▲', DOT: '●', LINK: '⬡', MATIC: '⬟',
  UNI: '🦄', ATOM: '⚛', LTC: 'Ł', FIL: '◆', NEAR: 'Ⓝ',
  TON: '💎', XLM: '✦', EOS: 'EOS', TRX: '△', ETC: 'Ξ',
  SHIB: '🐕', FLOKI: '🐕', WIF: '🐕', PEPE: '🐸', SUI: 'S',
};

const COIN_COLORS: Record<string, string> = {
  BTC: '#f7931a', ETH: '#627eea', SOL: '#9945ff', BNB: '#f3ba2f',
  XRP: '#00aae4', ADA: '#0033ad', DOGE: '#c2a633', AVAX: '#e84142',
  DOT: '#e6007a', LINK: '#2a5ada', MATIC: '#8247e5', UNI: '#ff007a',
  ATOM: '#2e3148', LTC: '#bfbbbb', FIL: '#0090ff', NEAR: '#00c08b',
  TON: '#0098ea', XLM: '#14b6e7', EOS: '#000000', TRX: '#ff0013',
  ETC: '#328332', SHIB: '#ffa409', FLOKI: '#e8443d', WIF: '#c8a951',
  PEPE: '#3e7d32', SUI: '#6fbcf0',
};

export function buildCoinFromSymbol(symbol: string): CoinData {
  const base = symbol.replace('_usdt', '').replace('/USDT', '').toUpperCase();
  return {
    symbol: base,
    name: COIN_NAMES[base] || base,
    icon: COIN_ICONS[base] || base.slice(0, 2),
    lbankSymbol: symbol.toLowerCase(),
    color: COIN_COLORS[base] || '#8892a4',
  };
}

export function getCoinBySymbol(symbol: string): CoinData | undefined {
  return defaultCoins.find(c => c.symbol === symbol);
}

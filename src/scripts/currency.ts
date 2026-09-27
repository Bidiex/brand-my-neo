// Selector de moneda COP / USD. Todo precio marcado con <Money> (clase .money, data-cop) se reescribe aquí.
// El pago siempre es en COP por Bre-B: USD es solo una referencia aproximada.

export type Currency = 'COP' | 'USD';

const KEY_CURRENCY = 'bmn-currency';
const KEY_RATE = 'bmn-rate';
const RATE_TTL = 12 * 60 * 60 * 1000; // 12 h
const FALLBACK_RATE = 3257; // COP por 1 USD (sep. 2026), por si la API no responde
const RATE_URL = 'https://open.er-api.com/v6/latest/USD';

let rate = FALLBACK_RATE;
try {
  const cached = JSON.parse(localStorage.getItem(KEY_RATE) || 'null');
  if (cached && typeof cached.rate === 'number') rate = cached.rate;
} catch { /* sin storage: usa la tasa de respaldo */ }

export const formatCOP = (n: number) => '$' + n.toLocaleString('es-CO');
// Redondeo a dólares enteros; un monto positivo nunca se muestra como US$0
export const formatUSD = (n: number) => 'US$' + (n > 0 ? Math.max(1, Math.round(n / rate)) : 0).toLocaleString('en-US');

export function getCurrency(): Currency {
  try {
    const v = localStorage.getItem(KEY_CURRENCY);
    if (v === 'COP' || v === 'USD') return v;
  } catch { /* sin storage */ }
  // Por defecto: pesos en español, dólares en inglés
  return document.documentElement.lang === 'en' ? 'USD' : 'COP';
}

function render() {
  const cur = getCurrency();
  document.documentElement.dataset.currency = cur;
  document.querySelectorAll<HTMLElement>('.money').forEach((el) => {
    const n = Number(el.dataset.cop);
    el.textContent = cur === 'USD' ? formatUSD(n) : formatCOP(n) + (el.dataset.code ? ' COP' : '');
  });
  document.dispatchEvent(new CustomEvent('currencychange', { detail: cur }));
}

export function setCurrency(cur: Currency) {
  try { localStorage.setItem(KEY_CURRENCY, cur); } catch { /* solo esta visita */ }
  render();
}

async function refreshRate() {
  try {
    const cached = JSON.parse(localStorage.getItem(KEY_RATE) || 'null');
    if (cached && Date.now() - cached.at < RATE_TTL) return;
  } catch { /* sigue */ }
  try {
    const res = await fetch(RATE_URL);
    const json = await res.json();
    const cop = json?.rates?.COP;
    if (typeof cop !== 'number' || cop < 1000) return;
    rate = cop;
    try { localStorage.setItem(KEY_RATE, JSON.stringify({ rate, at: Date.now() })); } catch { /* sigue */ }
    if (getCurrency() === 'USD') render();
  } catch { /* sin red: se queda con la tasa guardada o la de respaldo */ }
}

render();
refreshRate();

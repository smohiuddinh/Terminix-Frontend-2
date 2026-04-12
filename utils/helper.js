export const fmt = (n) =>
  'Rs ' + Math.abs(n).toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

export const uid = () => Math.random().toString(36).slice(2, 9)

export const today = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseLocalDate(dateInput) {
  if (!dateInput) return new Date(NaN);
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const [y, m, d] = dateInput.split('-').map(s => parseInt(s, 10));
    return new Date(y, m - 1, d);
  }
  return new Date(dateInput);
}

/**
 * normalizeDate — server se aane wali date ko safe YYYY-MM-DD string mein convert karta hai.
 * MySQL DATE -> Node.js -> UTC ISO string banta hai (e.g. "2026-04-12T19:00:00.000Z")
 * jo Pakistan timezone (UTC+5) mein ek din peeche dikhta hai.
 * Yeh function sirf date ka YYYY-MM-DD part extract karta hai bina kisi timezone conversion ke.
 */
export const normalizeDate = (rawDate) => {
  if (!rawDate) return today();
  const s = String(rawDate).trim();
  // Already a clean YYYY-MM-DD — return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  // ISO string like "2026-04-12T19:00:00.000Z" — take only date part before T
  const datePart = s.split('T')[0].split(' ')[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) return datePart;
  // Fallback to today
  return today();
};
/**
 * Compute running balance for each transaction and derive party-level totals.
 * For Party Ledger: debit = amount owed by party, credit = payment received.
 *   Net balance = totalDebit - totalCredit (positive = party owes us)
 * For Banker Ledger: credit = deposit/inflow, debit = withdrawal/outflow.
 *   Net balance = totalCredit - totalDebit (positive = bank holds our money)
 */
export const computePartyStats = (rawTxns) => {
  let running = 0
  const transactions = rawTxns.map((t) => {
    running += t.type === 'debit' ? t.amount : -t.amount
    const balance = running
    let status = 'pending'
    if (balance <= 0) status = 'paid'
    else if (t.type === 'credit') status = 'partial'
    return { ...t, debit: t.type === 'debit' ? t.amount : 0, credit: t.type === 'credit' ? t.amount : 0, balance, status }
  })
  const totalDebit  = transactions.reduce((s, t) => s + t.debit, 0)
  const totalCredit = transactions.reduce((s, t) => s + t.credit, 0)
  const balance     = totalDebit - totalCredit
  const status      = balance <= 0 ? 'paid' : balance < totalDebit ? 'partial' : 'pending'
  return { transactions, totalDebit, totalCredit, balance, status }
}

export const computeBankerStats = (rawTxns) => {
  let running = 0
  const transactions = rawTxns.map((t) => {
    running += t.type === 'credit' ? t.amount : -t.amount
    const balance = running
    const status  = balance >= 0 ? 'paid' : 'pending'
    return { ...t, debit: t.type === 'debit' ? t.amount : 0, credit: t.type === 'credit' ? t.amount : 0, balance, status }
  })
  const totalDebit  = transactions.reduce((s, t) => s + t.debit, 0)
  const totalCredit = transactions.reduce((s, t) => s + t.credit, 0)
  const balance     = totalCredit - totalDebit
  return { transactions, totalDebit, totalCredit, balance, status: balance >= 0 ? 'paid' : 'pending' }
}

export const hydrateParties = (parties) =>
  parties.map((p) => {
    const stats = computePartyStats(p.transactions)
    return { ...p, ...stats, openingBalance: p.openingBalance }
  })

export const hydrateBankers = (bankers) =>
  bankers.map((b) => {
    const stats = computeBankerStats(b.transactions)
    return { ...b, ...stats, openingBalance: b.openingBalance }
  })

export const STATUS_CFG = {
  paid:    { label: 'Cleared', dot: '#16a34a', textCls: 'status-paid',    bg: '#f0fdf4', border: '#bbf7d0' },
  pending: { label: 'Pending', dot: '#dc2626', textCls: 'status-pending', bg: '#fef2f2', border: '#fecaca' },
  partial: { label: 'Partial', dot: '#d97706', textCls: 'status-partial', bg: '#fffbeb', border: '#fde68a' },
}

export const BRAND = '#1a3d26'
export const MONO  = "'DM Mono', monospace"
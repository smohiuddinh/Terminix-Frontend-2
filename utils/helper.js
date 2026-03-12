export const fmt = (n) =>
  'Rs ' + Math.abs(n).toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

export const uid = () => Math.random().toString(36).slice(2, 9)

export const today = () => new Date().toISOString().slice(0, 10)

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
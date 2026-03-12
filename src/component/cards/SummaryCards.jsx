import React from 'react'
import { fmt,BRAND } from '../../../utils/helper';

export default function SummaryCards({ parties, ledgerType = 'party' }) {
  const cntPending = parties.filter(p => p.status === 'pending').length
  const cntPartial = parties.filter(p => p.status === 'partial').length
  const cntPaid    = parties.filter(p => p.status === 'paid').length
  const totalBalance = parties.reduce((s, p) => s + p.balance, 0)

  const cards = ledgerType === 'party'
    ? [
        { label: 'Total Outstanding', value: fmt(totalBalance), sub: `${cntPending + cntPartial} parties due`, color: BRAND,     bg: '#f0fdf4', border: '#bbf7d0' },
        { label: 'Pending',           value: String(cntPending), sub: 'Full amount due',   color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
        { label: 'Partial',           value: String(cntPartial), sub: 'Balance remaining', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
        { label: 'Cleared',           value: String(cntPaid),    sub: 'Fully settled',     color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
      ]
    : [
        { label: 'Total Bank Balance', value: fmt(totalBalance), sub: `Across ${parties.length} accounts`, color: BRAND,     bg: '#f0fdf4', border: '#bbf7d0' },
        { label: 'Accounts',           value: String(parties.length), sub: 'Active accounts',        color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe' },
        { label: 'Total Deposits',     value: fmt(parties.reduce((s,p) => s + p.totalCredit, 0)), sub: 'Cumulative inflow', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
        { label: 'Total Withdrawals',  value: fmt(parties.reduce((s,p) => s + p.totalDebit, 0)),  sub: 'Cumulative outflow', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
      ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
      {cards.map(card => (
        <div key={card.label} style={{
          background: '#fff',
          borderRadius: 16,
          border: `1px solid ${card.border}`,
          borderTop: `3px solid ${card.color}`,
          padding: '18px 20px',
          transition: 'box-shadow 0.15s',
        }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{card.label}</p>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#111827', fontFamily: "'DM Mono', monospace" }}>{card.value}</p>
          <p style={{ margin: '4px 0 0', fontSize: 11, color: '#9ca3af' }}>{card.sub}</p>
        </div>
      ))}
    </div>
  )
}
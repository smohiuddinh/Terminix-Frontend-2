import React from 'react'
import StatusBadge from './StatusBadge'
import { BRAND, fmt } from '../../../utils/helper'

const MONO = "'DM Mono', monospace"

export default function TransactionTable({ party, ledgerType, filterStatus, onFilterChange, onEditTxn, onDeleteTxn, columnLabels }) {
  const isBanker = ledgerType === 'banker'

  const labels = columnLabels ?? {
    date: 'Date', description: 'Description', debit: 'Debit (Dr)', credit: 'Credit (Cr)', balance: 'Balance'
  }

  const FILTERS = [
    { key: 'all',     label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'partial', label: 'Partial' },
    { key: 'paid',    label: 'Cleared' },
  ]

  const filteredTxns = party.transactions.filter(
    t => filterStatus === 'all' || t.status === filterStatus
  )

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        {FILTERS.map(f => {
          const active = filterStatus === f.key
          const count  = f.key === 'all'
            ? party.transactions.length
            : party.transactions.filter(t => t.status === f.key).length
          return (
            <button key={f.key} onClick={() => onFilterChange(f.key)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: active ? BRAND : '#fff',
              color:      active ? '#fff' : '#6b7280',
              border:     `1px solid ${active ? BRAND : '#e5e7eb'}`,
              boxShadow:  active ? `0 2px 8px ${BRAND}33` : 'none',
              transition: 'all 0.15s',
            }}>
              {f.label}
              <span style={{
                borderRadius: 999, padding: '1px 6px', fontSize: 10, fontWeight: 700,
                background: active ? 'rgba(255,255,255,0.2)' : '#f3f4f6',
                color: active ? '#fff' : '#6b7280',
              }}>{count}</span>
            </button>
          )
        })}
      </div>

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {filteredTxns.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <svg width="36" height="36" fill="none" stroke="#d1d5db" viewBox="0 0 24 24" style={{ margin: '0 auto 12px', display: 'block' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#9ca3af' }}>No transactions</p>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#d1d5db' }}>
              {filterStatus !== 'all' ? 'Change the filter above' : 'Click "Add Entry" to begin'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                  {[
                    labels.date,
                    labels.description,
                    ...(!isBanker ? ['Type'] : []),
                    labels.debit,
                    labels.credit,
                    labels.balance,
                    ...(!isBanker ? ['Status'] : []),
                    '',
                  ].map((h, i) => (
                    <th key={i} style={{
                      padding: '10px 14px', textAlign: 'left', fontSize: 10,
                      fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase',
                      letterSpacing: '0.07em', whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTxns.map(txn => (
                  <tr key={txn.id} style={{ borderBottom: '1px solid #f9fafb', transition: 'background 0.1s' }} className="txn-row">
                    {/* Date */}
                    <td style={{ padding: '11px 14px', color: '#9ca3af', fontFamily: MONO, fontSize: 12, whiteSpace: 'nowrap' }}>{txn.date}</td>

                    {/* Particulars / Description */}
                    <td style={{ padding: '11px 14px' }}>
                      <p style={{ margin: 0, color: '#111827', fontWeight: 500 }}>{txn.description}</p>
                      {txn.note && <p style={{ margin: '2px 0 0', fontSize: 11, color: '#9ca3af' }}>{txn.note}</p>}
                    </td>

                    {/* Type — party ledger only */}
                    {!isBanker && (
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 6,
                          fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                          background: txn.type === 'debit' ? '#fef2f2' : '#f0fdf4',
                          color:      txn.type === 'debit' ? '#dc2626'  : '#16a34a',
                        }}>
                          {txn.type === 'debit' ? '↑ Dr' : '↓ Cr'}
                        </span>
                      </td>
                    )}

                    {/* Debit */}
                    <td style={{ padding: '11px 14px', fontFamily: MONO, fontWeight: 600, color: txn.debit > 0 ? '#dc2626' : '#d1d5db', whiteSpace: 'nowrap' }}>
                      {txn.debit > 0 ? fmt(txn.debit) : '—'}
                    </td>

                    {/* Credit */}
                    <td style={{ padding: '11px 14px', fontFamily: MONO, fontWeight: 600, color: txn.credit > 0 ? '#16a34a' : '#d1d5db', whiteSpace: 'nowrap' }}>
                      {txn.credit > 0 ? fmt(txn.credit) : '—'}
                    </td>

                    {/* Balance */}
                    <td style={{ padding: '11px 14px', fontFamily: MONO, fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>{fmt(txn.balance)}</td>

                    {/* Status — party ledger only */}
                    {!isBanker && (
                      <td style={{ padding: '11px 14px' }}><StatusBadge status={txn.status} /></td>
                    )}

                    {/* Actions */}
                    <td style={{ padding: '11px 14px' }}>
                      <div className="txn-actions" style={{ display: 'flex', gap: 2 }}>
                        <button onClick={() => onEditTxn(txn)} style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }} title="Edit">
                          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => onDeleteTxn(txn.id)} style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }} title="Delete">
                          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: '2px solid #e5e7eb', background: '#f9fafb' }}>
                  <td colSpan={isBanker ? 2 : 3} style={{ padding: '10px 14px', fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Totals</td>
                  <td style={{ padding: '10px 14px', fontFamily: MONO, fontWeight: 700, color: '#dc2626' }}>{fmt(party.totalDebit)}</td>
                  <td style={{ padding: '10px 14px', fontFamily: MONO, fontWeight: 700, color: '#16a34a' }}>{fmt(party.totalCredit)}</td>
                  <td style={{ padding: '10px 14px', fontFamily: MONO, fontWeight: 700, color: BRAND }}>{fmt(party.balance)}</td>
                  <td colSpan={isBanker ? 1 : 2} />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
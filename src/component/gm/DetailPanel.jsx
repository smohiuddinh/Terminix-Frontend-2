import React, { useState } from 'react'
import StatusBadge from './StatusBadge'
import TransactionTable from './TransactionTable'
import { BRAND, fmt } from '../../../utils/helper';

const MONO = "'DM Mono', monospace"

export default function DetailPanel({ party, filterStatus, onFilterChange, onEdit, onAddTxn, onEditTxn, onDeleteTxn, onDeleteParty, ledgerType }) {
  const [tab, setTab] = useState('ledger')

  if (!party) return null

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg,${BRAND},#29623A)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>
              {party.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>{party.name}</h2>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9ca3af' }}>
                {party.phone}{party.address ? ` · ${party.address}` : ''}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <StatusBadge status={party.status} />
            <button onClick={onEdit} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 10,
              border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, fontWeight: 600, color: '#4b5563', cursor: 'pointer',
            }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button onClick={onAddTxn} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 10,
              border: 'none', background: `linear-gradient(135deg,${BRAND},#29623A)`, fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer',
            }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add Entry
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid #f3f4f6' }}>
          {[
            { label: ledgerType === 'banker' ? 'Total Withdrawals' : 'Total Debit',  val: fmt(party.totalDebit),  color: '#dc2626' },
            { label: ledgerType === 'banker' ? 'Total Deposits'    : 'Total Credit', val: fmt(party.totalCredit), color: '#16a34a' },
            { label: 'Net Balance', val: fmt(party.balance), color: BRAND },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: '14px 20px', textAlign: 'center',
              borderRight: i < 2 ? '1px solid #f3f4f6' : 'none',
            }}>
              <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: s.color, fontFamily: MONO }}>{s.val}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', background: '#f9fafb' }}>
          {[['ledger', 'Transaction Ledger'], ['info', 'Account Info']].map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '10px 20px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: 'transparent', border: 'none', borderBottom: `2px solid ${tab === t ? BRAND : 'transparent'}`,
              color: tab === t ? BRAND : '#9ca3af', transition: 'all 0.15s',
            }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'ledger' && (
        <TransactionTable
          party={party}
          filterStatus={filterStatus}
          onFilterChange={onFilterChange}
          onEditTxn={onEditTxn}
          onDeleteTxn={onDeleteTxn}
        />
      )}

      {tab === 'info' && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '20px 24px' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 700, color: '#374151' }}>Account Details</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {[
              { label: 'Name',              value: party.name },
              { label: 'Phone',             value: party.phone || '—' },
              { label: 'Address',           value: party.address || '—' },
              { label: 'Created On',        value: party.createdAt },
              { label: 'Opening Balance',   value: fmt(party.openingBalance) },
              { label: 'Total Transactions',value: String(party.transactions.length) },
            ].map(row => (
              <div key={row.label} style={{ padding: '12px 14px', borderRadius: 12, background: '#f9fafb', border: '1px solid #f3f4f6' }}>
                <p style={{ margin: '0 0 3px', fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{row.label}</p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#111827' }}>{row.value}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={onDeleteParty} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10,
              border: '1px solid #fecaca', background: '#fff', fontSize: 12, fontWeight: 600, color: '#dc2626', cursor: 'pointer',
            }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete this Account
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
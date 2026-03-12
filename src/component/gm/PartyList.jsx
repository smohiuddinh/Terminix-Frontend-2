import React from 'react'
import StatusBadge from './StatusBadge'
import { BRAND, fmt } from '../../../utils/helper';

export default function PartyList({ parties, selectedId, onSelect, onEdit, onDelete, search, onSearchChange, total, onAdd, addLabel }) {
  const filtered = parties.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ width: 260, flexShrink: 0, background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>All Accounts</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', background: BRAND, borderRadius: 999, padding: '1px 8px' }}>{parties.length}</span>
        </div>
        <div style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input style={{
            width: '100%', padding: '7px 10px 7px 30px', fontSize: 12, borderRadius: 10,
            border: '1px solid #e5e7eb', background: '#f9fafb', outline: 'none', boxSizing: 'border-box', color: '#111827',
          }} placeholder="Search…" value={search} onChange={e => onSearchChange(e.target.value)} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', maxHeight: 420 }}>
        {filtered.length === 0
          ? <div style={{ padding: '32px 16px', textAlign: 'center', fontSize: 12, color: '#9ca3af' }}>No accounts found.</div>
          : filtered.map(party => {
              const active = party.id === selectedId
              return (
                <div key={party.id} onClick={() => onSelect(party.id)} style={{
                  display: 'flex', alignItems: 'center', padding: '12px 16px', cursor: 'pointer',
                  background: active ? '#f0fdf4' : '#fff', borderLeft: `3px solid ${active ? BRAND : 'transparent'}`,
                  borderBottom: '1px solid #f9fafb', transition: 'background 0.1s',
                }} className="party-row">
                  <div style={{ flex: 1, minWidth: 0, marginRight: 8 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: active ? 600 : 400, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {party.name}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: 11, color: '#9ca3af', fontFamily: "'DM Mono', monospace" }}>{fmt(party.balance)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <StatusBadge status={party.status} />
                    <div className="row-actions" style={{ display: 'flex', gap: 1, marginLeft: 2 }}>
                      <button onClick={e => { e.stopPropagation(); onEdit(party) }} style={{
                        width: 24, height: 24, borderRadius: 6, border: 'none', background: 'transparent',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af',
                      }} title="Edit">
                        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={e => { e.stopPropagation(); onDelete(party.id) }} style={{
                        width: 24, height: 24, borderRadius: 6, border: 'none', background: 'transparent',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af',
                      }} title="Delete">
                        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
      </div>

      <div style={{ padding: '10px 16px', borderTop: '1px solid #f3f4f6', background: '#f9fafb', display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
        <span style={{ color: '#9ca3af' }}>{parties.length} accounts</span>
        <span style={{ fontWeight: 600, color: '#374151', fontFamily: "'DM Mono', monospace" }}>{fmt(total)} total</span>
      </div>
    </div>
  )
}
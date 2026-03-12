import React, { useState } from 'react'
import InputField, { inputCls } from '../input'
import { BRAND, uid, today, fmt } from '../../../utils/helper'
// import { BRAND, uid, today, fmt } from '../../../utils/helpers'

export default function TxnForm({ party, initial, onSave, onClose, ledgerType = 'party' }) {
  const [type, setType] = useState(initial?.type ?? 'debit')
  const [form, setForm] = useState({
    date:        initial?.date        ?? today(),
    description: initial?.description ?? '',
    amount:      String(initial?.amount ?? ''),
    note:        initial?.note        ?? '',
  })
  const [errors, setErrors] = useState({})
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.description.trim())              e.description = 'Description is required'
    if (!form.amount || parseFloat(form.amount) <= 0) e.amount = 'Enter a valid amount'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    const txn = {
      id:          initial?.id ?? ('t' + uid()),
      date:        form.date,
      description: form.description.trim(),
      type,
      amount:      parseFloat(form.amount),
      note:        form.note.trim() || '',
    }
    onSave(txn, initial)
  }

  const amt = parseFloat(form.amount) || 0
  const currentBalance = party.balance ?? 0
  const baseBalance    = initial
    ? currentBalance - (initial.type === 'debit' ? initial.amount : -initial.amount)
    : currentBalance
  const previewBalance = amt > 0
    ? (ledgerType === 'banker'
        ? baseBalance + (type === 'credit' ? amt : -amt)
        : baseBalance + (type === 'debit'  ? amt : -amt))
    : null

  const debitLabel  = ledgerType === 'banker' ? '↑ Debit (Withdrawal)'   : '↑ Debit (Amount Due)'
  const creditLabel = ledgerType === 'banker' ? '↓ Credit (Deposit)'      : '↓ Credit (Payment Recv.)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ borderRadius: 12, background: '#f9fafb', border: '1px solid #e5e7eb', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Party</p>
          <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 700, color: '#111827' }}>{party.name}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Balance</p>
          <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 700, color: BRAND, fontFamily: "'DM Mono', monospace" }}>{fmt(currentBalance)}</p>
        </div>
      </div>

      <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#f9fafb', padding: 4, gap: 4 }}>
        {['debit', 'credit'].map(t => (
          <button key={t} onClick={() => setType(t)} style={{
            flex: 1, padding: '8px 0', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            background:   type === t ? (t === 'debit' ? '#fef2f2' : '#f0fdf4') : 'transparent',
            color:        type === t ? (t === 'debit' ? '#dc2626' : '#16a34a') : '#9ca3af',
            border:       type === t ? `1.5px solid ${t === 'debit' ? '#fecaca' : '#bbf7d0'}` : '1.5px solid transparent',
            transition:   'all 0.1s',
          }}>
            {t === 'debit' ? debitLabel : creditLabel}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <InputField label="Date" required>
          <input type="date" style={{ ...inputCls, fontFamily: "'DM Mono', monospace" }}
            value={form.date} onChange={e => set('date', e.target.value)} />
        </InputField>
        <InputField label="Amount (Rs)" required error={errors.amount}>
          <input type="number" style={{ ...inputCls, fontFamily: "'DM Mono', monospace" }}
            placeholder="0.00" value={form.amount} onChange={e => set('amount', e.target.value)} />
        </InputField>
      </div>

      <InputField label="Description" required error={errors.description}>
        <input style={inputCls}
          placeholder={type === 'debit' ? 'e.g. Invoice #1092 – Goods' : 'e.g. Payment via Transfer'}
          value={form.description} onChange={e => set('description', e.target.value)} />
      </InputField>

      <InputField label="Note (optional)">
        <textarea style={{ ...inputCls, resize: 'none' }} rows={2}
          placeholder="Additional remarks…" value={form.note} onChange={e => set('note', e.target.value)} />
      </InputField>

      {previewBalance !== null && (
        <div style={{
          borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: type === 'credit' ? '#f0fdf4' : '#fef2f2', border: `1px solid ${type === 'credit' ? '#d1fae5' : '#fecaca'}`,
        }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#4b5563' }}>{initial ? 'Updated' : 'New'} Balance</span>
          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: type === 'credit' ? '#16a34a' : '#dc2626' }}>
            {fmt(previewBalance)}
          </span>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
        <button onClick={onClose} style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13, fontWeight: 600, color: '#4b5563', cursor: 'pointer' }}>
          Cancel
        </button>
        <button onClick={handleSubmit} style={{
          flex: 1, padding: '10px 0', borderRadius: 12, border: 'none',
          background: type === 'debit' ? 'linear-gradient(135deg,#dc2626,#b91c1c)' : 'linear-gradient(135deg,#16a34a,#15803d)',
          fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer',
        }}>
          {initial ? 'Save Changes' : `Add ${type === 'debit' ? 'Debit' : 'Credit'}`}
        </button>
      </div>
    </div>
  )
}
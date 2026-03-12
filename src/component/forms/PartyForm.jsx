import React, { useState } from 'react'
import { BRAND, uid, today, fmt } from '../../../utils/helper'
import InputField, { inputCls } from '../input';

export default function PartyForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    name:           initial?.name           ?? '',
    phone:          initial?.phone          ?? '',
    address:        initial?.address        ?? '',
    openingBalance: String(initial?.openingBalance ?? ''),
  })
  const [errors, setErrors] = useState({})
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Party name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    else if (!/^\d{10,11}$/.test(form.phone)) e.phone = 'Enter a valid phone number'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    const ob = parseFloat(form.openingBalance) || 0

    if (initial) {
      onSave({ ...initial, name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() })
    } else {
      const newParty = {
        id: 'p' + uid(),
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        openingBalance: ob,
        createdAt: today(),
        transactions: ob > 0 ? [{
          id: 't' + uid(), date: today(), description: 'Opening Balance',
          type: 'debit', amount: ob, note: '',
        }] : [],
      }
      onSave(newParty)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InputField label="Party Name" required error={errors.name}>
        <input style={inputCls} placeholder="e.g. Ramesh Traders" value={form.name} onChange={e => set('name', e.target.value)} />
      </InputField>
      <InputField label="Phone Number" required error={errors.phone}>
        <input style={inputCls} placeholder="10-11 digit phone" value={form.phone} onChange={e => set('phone', e.target.value)} maxLength={11} />
      </InputField>
      <InputField label="Address">
        <input style={inputCls} placeholder="City, Country" value={form.address} onChange={e => set('address', e.target.value)} />
      </InputField>
      {!initial && (
        <InputField label="Opening Balance (Rs)">
          <input type="number" style={{ ...inputCls, fontFamily: "'DM Mono', monospace" }} placeholder="0"
            value={form.openingBalance} onChange={e => set('openingBalance', e.target.value)} />
        </InputField>
      )}
      {form.name && (
        <div style={{ borderRadius: 12, background: '#f0fdf4', border: '1px solid #d1fae5', padding: '12px 16px' }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#166534' }}>{form.name}</p>
          {!initial && parseFloat(form.openingBalance) > 0 && (
            <p style={{ margin: '3px 0 0', fontSize: 12, color: '#16a34a' }}>Opening: {fmt(parseFloat(form.openingBalance))}</p>
          )}
        </div>
      )}
      <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
        <button onClick={onClose} style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13, fontWeight: 600, color: '#4b5563', cursor: 'pointer' }}>
          Cancel
        </button>
        <button onClick={handleSubmit} style={{
          flex: 1, padding: '10px 0', borderRadius: 12, border: 'none',
          background: `linear-gradient(135deg,${BRAND},#29623A)`, fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer',
        }}>
          {initial ? 'Save Changes' : 'Create Party'}
        </button>
      </div>
    </div>
  )
}
import React from 'react'

export const inputCls = {
  width: '100%',
  padding: '10px 12px',
  fontSize: 13,
  borderRadius: 12,
  border: '1px solid #e5e7eb',
  background: '#f9fafb',
  outline: 'none',
  boxSizing: 'border-box',
  color: '#111827',
  transition: 'border-color 0.15s, background 0.15s',
}

export default function InputField({ label, required, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}{required && <span style={{ color: '#f87171', marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {error && <p style={{ margin: 0, fontSize: 11, color: '#ef4444' }}>{error}</p>}
    </div>
  )
}
import React from 'react'
import { STATUS_CFG } from '../../../utils/helper'

export default function StatusBadge({ status }) {
  const c = STATUS_CFG[status] || STATUS_CFG.pending
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '2px 10px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: status === 'paid' ? '#166534' : status === 'partial' ? '#92400e' : '#991b1b',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
      {c.label}
    </span>
  )
}
import { BRAND } from '../../../utils/helper';

export default function ConfirmDialog({ open, title, message, danger = true, onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={onCancel} />
      <div style={{
        position: 'relative', background: '#fff', borderRadius: 20, boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
        width: '100%', maxWidth: 360, padding: 24, animation: 'modalIn 0.12s ease',
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px', background: danger ? '#fef2f2' : '#fffbeb',
        }}>
          <svg width="22" height="22" fill="none" stroke={danger ? '#dc2626' : '#d97706'} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#111827', textAlign: 'center' }}>{title}</h3>
        <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6b7280', textAlign: 'center' }}>{message}</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: '10px 0', borderRadius: 12, border: '1px solid #e5e7eb',
            background: '#fff', fontSize: 13, fontWeight: 600, color: '#4b5563', cursor: 'pointer',
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: '10px 0', borderRadius: 12, border: 'none',
            background: danger ? 'linear-gradient(135deg,#dc2626,#b91c1c)' : `linear-gradient(135deg,${BRAND},#29623A)`,
            fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer',
          }}>{danger ? 'Delete' : 'Confirm'}</button>
        </div>
      </div>
    </div>
  )
}
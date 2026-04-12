import { useSelector } from 'react-redux';
import { BRAND } from '../../../utils/helper';

export default function Header({ activeLedger, onLogout, onToggleSidebar }) {
  const title    = activeLedger === 'party' ? 'Party Ledger' : 'Banker Ledger'
  const subtitle = activeLedger === 'party'
    ? 'Payment records · Clearance tracking · Balance history'
    : 'Bank accounts · Deposits · Withdrawals · Account balances'
  const user = useSelector((state) => state.user.userDetails);

  return (
    <header style={{
      height: 60,
      background: '#fff',
      borderBottom: '1px solid #f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 30,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

        {/* Sidebar toggle */}
        <button onClick={onToggleSidebar} style={{
          width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e7eb',
          background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280',
        }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo — replace src with your actual image path */}
        <img
          src="../../../src/assets/logo.png"
          alt="Company Logo"
          onError={e => { e.currentTarget.style.display = 'none' }}
          style={{ height: 32, width: 'auto', objectFit: 'contain' }}
        />

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: '#e5e7eb' }} />

        {/* Title */}
        <div>
          <h1 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#111827' }}>{title}</h1>
          <p style={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>{subtitle}</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#111827' }}>{user?.email || 'admin@gm.com'}</p>
          <p style={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>{user.name}</p>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: BRAND,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: '#fff',
        }}>GM</div>
        <button onClick={onLogout} style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
          borderRadius: 10, border: '1px solid #fecaca', background: '#fff',
          fontSize: 12, fontWeight: 600, color: '#dc2626', cursor: 'pointer',
        }}>
          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  )
}
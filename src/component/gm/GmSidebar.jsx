import { BRAND } from '../../../utils/helper';

const NAV_ITEMS = [
  {
    key: 'party',
    label: 'Party Ledger',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: 'banker',
    label: 'Banker Ledger',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
]

export default function Sidebar({ active, onChange, collapsed }) {
  return (
    <aside style={{
      width: collapsed ? 64 : 220,
      minHeight: '100vh',
      background: '#fff',
      borderRight: '1px solid #f0f0f0',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.2s',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflow: 'hidden',
    }}>
      <div style={{ padding: collapsed ? '20px 0' : '20px 16px', borderBottom: '1px solid #f3f4f6' }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: BRAND,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="18" height="18" fill="none" stroke="#fff" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M12 7h.01M9 7H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 4h.01" />
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>GM Ledger</p>
              <p style={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>Finance Portal</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: BRAND, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" fill="none" stroke="#fff" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M12 7h.01M9 7H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 4h.01" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {!collapsed && (
        <p style={{ margin: '16px 16px 8px', fontSize: 10, fontWeight: 600, color: '#d1d5db', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Ledgers
        </p>
      )}

      <nav style={{ flex: 1, padding: '0 8px' }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.key
          return (
            <button key={item.key} onClick={() => onChange(item.key)} style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: collapsed ? '10px 0' : '10px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 10,
              border: 'none',
              background: isActive ? '#f0fdf4' : 'transparent',
              color: isActive ? BRAND : '#6b7280',
              fontSize: 13,
              fontWeight: isActive ? 600 : 500,
              cursor: 'pointer',
              marginBottom: 2,
              transition: 'all 0.15s',
              borderLeft: isActive ? `3px solid ${BRAND}` : '3px solid transparent',
            }}>
              <span style={{ color: isActive ? BRAND : '#9ca3af', flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
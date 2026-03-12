import React, { useState } from 'react'
import LedgerPage from './LedgerPage';
import { seedBankers,seedParties } from '../../../data/seedData';
import Header from './header';
import Sidebar from './GmSidebar';

export default function GmDashboard() {
  const [activeLedger, setActiveLedger] = useState('party')
  const [collapsed, setCollapsed]       = useState(false)

  const handleLogout = () => {
    alert('Logout triggered — wire to your auth system.')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa', fontFamily: "'DM Sans', sans-serif" }}>
      <Sidebar active={activeLedger} onChange={setActiveLedger} collapsed={collapsed} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header
          activeLedger={activeLedger}
          onLogout={handleLogout}
          onToggleSidebar={() => setCollapsed(c => !c)}
        />

        <main style={{ flex: 1, padding: '24px 28px', overflowX: 'hidden' }}>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#111827' }}>
              {activeLedger === 'party' ? 'Party Ledger' : 'Banker Ledger'}
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9ca3af' }}>
              Hi, Welcome General Manager
            </p>
          </div>

          {activeLedger === 'party' && (
            <LedgerPage
              key="party"
              ledgerType="party"
              initialData={seedParties}
            />
          )}
          {activeLedger === 'banker' && (
            <LedgerPage
              key="banker"
              ledgerType="banker"
              initialData={seedBankers}
            />
          )}
        </main>
      </div>
    </div>
  )
}
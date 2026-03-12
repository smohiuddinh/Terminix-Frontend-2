import React, { useState } from 'react'
import { BRAND, uid, today, fmt, computePartyStats, computeBankerStats } from '../../../utils/helper'
import TxnForm from '../forms/TxnForm';
import PartyForm from '../forms/PartyForm';
import ConfirmDialog from './ConfirmDialog';
import Modal from '../modal/Modal3';
import DetailPanel from './DetailPanel';
import PartyList from './PartyList';
import SummaryCards from '../cards/SummaryCards';

const computeStats = (type, rawTxns) =>
  type === 'banker' ? computeBankerStats(rawTxns) : computePartyStats(rawTxns)

const hydrate = (ledgerType, items) =>
  items.map(item => {
    const stats = computeStats(ledgerType, item.transactions)
    return { ...item, ...stats }
  })

export default function LedgerPage({ ledgerType, initialData }) {
  const [items, setItems]           = useState(() => hydrate(ledgerType, initialData))
  const [selectedId, setSelectedId] = useState(() => initialData[0]?.id ?? '')
  const [filterStatus, setFilter]   = useState('all')
  const [search, setSearch]         = useState('')

  const [showForm,     setShowForm]     = useState(false)
  const [editItem,     setEditItem]     = useState(null)
  const [deleteItemId, setDeleteItemId] = useState(null)

  const [showTxnForm,  setShowTxnForm]  = useState(false)
  const [editTxn,      setEditTxn]      = useState(null)
  const [deleteTxnId,  setDeleteTxnId]  = useState(null)

  const selected = items.find(p => p.id === selectedId)

  const rehydrate = (item, txns) => {
    const stats = computeStats(ledgerType, txns)
    return { ...item, ...stats, transactions: stats.transactions }
  }

  const handleSaveItem = (item) => {
    if (editItem) {
      setItems(prev => prev.map(p => p.id === item.id ? rehydrate(p, item.transactions ?? p.transactions) : p))
    } else {
      const hydrated = rehydrate(item, item.transactions)
      setItems(prev => [hydrated, ...prev])
      setSelectedId(hydrated.id)
    }
    setShowForm(false); setEditItem(null)
  }

  const handleDeleteItem = () => {
    if (!deleteItemId) return
    const remaining = items.filter(p => p.id !== deleteItemId)
    setItems(remaining)
    if (selectedId === deleteItemId) setSelectedId(remaining[0]?.id ?? '')
    setDeleteItemId(null)
  }

  const handleSaveTxn = (txn, oldTxn) => {
    setItems(prev => prev.map(item => {
      if (item.id !== selectedId) return item
      let rawTxns
      if (oldTxn) {
        rawTxns = item.transactions.map(t =>
          t.id === oldTxn.id ? { id: t.id, date: txn.date, description: txn.description, type: txn.type, amount: txn.amount, note: txn.note } : { ...t, amount: t.amount ?? (t.debit || t.credit) }
        )
      } else {
        rawTxns = [...item.transactions.map(t => ({ ...t, amount: t.amount ?? (t.debit || t.credit) })),
          { id: txn.id, date: txn.date, description: txn.description, type: txn.type, amount: txn.amount, note: txn.note }]
      }
      return rehydrate(item, rawTxns)
    }))
    setShowTxnForm(false); setEditTxn(null)
  }

  const handleDeleteTxn = () => {
    if (!deleteTxnId || !selected) return
    setItems(prev => prev.map(item => {
      if (item.id !== selectedId) return item
      const rawTxns = item.transactions
        .filter(t => t.id !== deleteTxnId)
        .map(t => ({ ...t, amount: t.amount ?? (t.debit || t.credit) }))
      return rehydrate(item, rawTxns)
    }))
    setDeleteTxnId(null)
  }

  const totalBalance  = items.reduce((s, p) => s + p.balance, 0)
  const itemToDelete  = items.find(p => p.id === deleteItemId)
  const txnToDelete   = selected?.transactions.find(t => t.id === deleteTxnId)
  const addLabel      = ledgerType === 'banker' ? 'New Bank' : 'New Party'
  const formTitle     = ledgerType === 'banker' ? (editItem ? 'Edit Bank Account' : 'Add Bank Account') : (editItem ? 'Edit Party' : 'Create New Party')

  return (
    <div>
      <SummaryCards parties={items} ledgerType={ledgerType} />

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <PartyList
          parties={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onEdit={p => { setEditItem(p); setShowForm(true) }}
          onDelete={setDeleteItemId}
          search={search}
          onSearchChange={setSearch}
          total={totalBalance}
          onAdd={() => { setEditItem(null); setShowForm(true) }}
          addLabel={addLabel}
        />

        {selected && (
          <DetailPanel
            party={selected}
            ledgerType={ledgerType}
            filterStatus={filterStatus}
            onFilterChange={setFilter}
            onEdit={() => { setEditItem(selected); setShowForm(true) }}
            onAddTxn={() => { setEditTxn(null); setShowTxnForm(true) }}
            onEditTxn={txn => { setEditTxn(txn); setShowTxnForm(true) }}
            onDeleteTxn={setDeleteTxnId}
            onDeleteParty={() => setDeleteItemId(selected.id)}
          />
        )}
      </div>

      <Modal open={showForm} onClose={() => { setShowForm(false); setEditItem(null) }}
        title={formTitle}
        subtitle={editItem ? `Editing: ${editItem.name}` : `Add a new ${ledgerType === 'banker' ? 'bank account' : 'party'}`}>
        <PartyForm initial={editItem ?? undefined} onSave={handleSaveItem} onClose={() => { setShowForm(false); setEditItem(null) }} />
      </Modal>

      <Modal open={showTxnForm} onClose={() => { setShowTxnForm(false); setEditTxn(null) }}
        title={editTxn ? 'Edit Transaction' : 'Add Transaction'}
        subtitle={`Account: ${selected?.name}`}>
        {selected && (
          <TxnForm
            party={selected}
            initial={editTxn ?? undefined}
            ledgerType={ledgerType}
            onSave={handleSaveTxn}
            onClose={() => { setShowTxnForm(false); setEditTxn(null) }}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteItemId}
        title={`Delete ${ledgerType === 'banker' ? 'Bank Account' : 'Party'}?`}
        message={`"${itemToDelete?.name}" and all its ${itemToDelete?.transactions.length ?? 0} transactions will be permanently removed.`}
        onConfirm={handleDeleteItem}
        onCancel={() => setDeleteItemId(null)} />

      <ConfirmDialog
        open={!!deleteTxnId}
        title="Delete Transaction?"
        message={`"${txnToDelete?.description}" — ${txnToDelete ? fmt(txnToDelete.amount ?? (txnToDelete.debit || txnToDelete.credit)) : ''} will be removed and balances will be recalculated.`}
        onConfirm={handleDeleteTxn}
        onCancel={() => setDeleteTxnId(null)} />
    </div>
  )
}
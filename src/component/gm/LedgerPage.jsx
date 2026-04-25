import React, { useState, useEffect } from 'react'
import { fmt } from '../../../utils/helper'
import TxnForm from '../forms/TxnForm'
import PartyForm from '../forms/PartyForm'
import ConfirmDialog from './ConfirmDialog'
import Modal from '../modal/Modal3'
import DetailPanel from './DetailPanel'
import PartyList from './PartyList'
import SummaryCards from '../cards/SummaryCards'
import {
  useGetAccounts,
  useGetAccountById,
  useCreateAccount,
  useUpdateAccount,
  useDeleteAccount,
  useAddTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from '../../../api/client/Ledger'

export default function LedgerPage({ ledgerType }) {
  const [selectedId,   setSelectedId]   = useState('')
  const [filterStatus, setFilter]       = useState('all')
  const [search,       setSearch]       = useState('')

  const [showForm,     setShowForm]     = useState(false)
  const [editItem,     setEditItem]     = useState(null)
  const [deleteItemId, setDeleteItemId] = useState(null)

  const [showTxnForm,  setShowTxnForm]  = useState(false)
  const [editTxn,      setEditTxn]      = useState(null)
  const [deleteTxnId,  setDeleteTxnId]  = useState(null)

  // ── Queries ──────────────────────────────────────────────────────────────
  const { accounts, isLoading: listLoading } = useGetAccounts({ ledgerType })
  const { account: selected, isLoading: detailLoading } = useGetAccountById(selectedId)

  // selectedId auto-set on first load
  useEffect(() => {
    if (!selectedId && accounts.length > 0) {
      setSelectedId(accounts[0].id)
    }
  }, [accounts, selectedId])

  // ── Mutations ─────────────────────────────────────────────────────────────
  const { createAccount,   isPending: creatingAccount  } = useCreateAccount()
  const { updateAccount,   isPending: updatingAccount  } = useUpdateAccount()
  const { deleteAccount,   isPending: deletingAccount  } = useDeleteAccount()
  const { addTransaction,  isPending: addingTxn        } = useAddTransaction()
  const { updateTransaction, isPending: updatingTxn    } = useUpdateTransaction()
  const { deleteTransaction, isPending: deletingTxn    } = useDeleteTransaction()

  // ── Handlers: Account ─────────────────────────────────────────────────────
  const handleSaveItem = (item) => {
    if (editItem) {
      // Edit — name/phone/address/openingBalance/status update karo
      updateAccount(
        { id: item.id, name: item.name, phone: item.phone, address: item.address, openingBalance: item.openingBalance, status: item.status },
        {
          onSuccess: () => { setShowForm(false); setEditItem(null) },
        }
      )
    } else {
      // Create — ledgerType bhi bhejo
      createAccount(
        { ...item, ledgerType },
        {
          onSuccess: (res) => {
            const created = res?.data?.data
            if (created?.id) setSelectedId(created.id)
            setShowForm(false); setEditItem(null)
          },
        }
      )
    }
  }

  const handleDeleteItem = () => {
    if (!deleteItemId) return
    deleteAccount(deleteItemId, {
      onSuccess: () => {
        // Agar deleted account selected tha toh first available select karo
        if (selectedId === deleteItemId) {
          const remaining = accounts.filter(a => a.id !== deleteItemId)
          setSelectedId(remaining[0]?.id ?? '')
        }
        setDeleteItemId(null)
      },
    })
  }

  // ── Handlers: Transaction ─────────────────────────────────────────────────
  const handleSaveTxn = (txn, oldTxn) => {
    if (oldTxn) {
      updateTransaction(
        {
          accountId:   selectedId,
          txnId:       oldTxn.id,
          date:        txn.date,
          description: txn.description,
          type:        txn.type,
          amount:      txn.amount,
          note:        txn.note,
          status:      txn.status,
        },
        { onSuccess: () => { setShowTxnForm(false); setEditTxn(null) } }
      )
    } else {
      addTransaction(
        {
          accountId:   selectedId,
          txnId:       txn.id,
          date:        txn.date,
          description: txn.description,
          type:        txn.type,
          amount:      txn.amount,
          note:        txn.note,
          status:      txn.status,
        },
        { onSuccess: () => { setShowTxnForm(false); setEditTxn(null) } }
      )
    }
  }

  const handleDeleteTxn = () => {
    if (!deleteTxnId || !selectedId) return
    deleteTransaction(
      { accountId: selectedId, txnId: deleteTxnId },
      { onSuccess: () => setDeleteTxnId(null) }
    )
  }

  // ── Derived values ────────────────────────────────────────────────────────
  const totalBalance = accounts.reduce((s, a) => s + (a.balance ?? 0), 0)
  const itemToDelete = accounts.find(a => a.id === deleteItemId)
  const txnToDelete  = selected?.transactions?.find(t => t.id === deleteTxnId)
  const addLabel     = ledgerType === 'banker' ? 'New Bank'  : 'New Party'
  const formTitle    = ledgerType === 'banker'
    ? (editItem ? 'Edit Bank Account'  : 'Add Bank Account')
    : (editItem ? 'Edit Party'         : 'Create New Party')

  // ── Loading state ─────────────────────────────────────────────────────────
  if (listLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: '#1a5c2a', animation: 'spin 0.7s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <SummaryCards parties={accounts} ledgerType={ledgerType} />

      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
        <PartyList
          parties={accounts}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onEdit={a => { setEditItem(a); setShowForm(true) }}
          onDelete={setDeleteItemId}
          search={search}
          onSearchChange={setSearch}
          total={totalBalance}
          onAdd={() => { setEditItem(null); setShowForm(true) }}
          addLabel={addLabel}
        />

        {detailLoading ? (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: '#1a5c2a', animation: 'spin 0.7s linear infinite' }} />
          </div>
        ) : selected && (
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

      {/* ── Account Form Modal ── */}
      <Modal
        open={showForm}
        onClose={() => { setShowForm(false); setEditItem(null) }}
        title={formTitle}
        subtitle={editItem ? `Editing: ${editItem.name}` : `Add a new ${ledgerType === 'banker' ? 'bank account' : 'party'}`}
      >
        <PartyForm
          initial={editItem ?? undefined}
          ledgerType={ledgerType}
          onSave={handleSaveItem}
          onClose={() => { setShowForm(false); setEditItem(null) }}
          loading={creatingAccount || updatingAccount}
        />
      </Modal>

      {/* ── Transaction Form Modal ── */}
      <Modal
        open={showTxnForm}
        onClose={() => { setShowTxnForm(false); setEditTxn(null) }}
        title={editTxn ? 'Edit Transaction' : 'Add Transaction'}
        subtitle={`Account: ${selected?.name}`}
      >
        {selected && (
          <TxnForm
            party={selected}
            initial={editTxn ?? undefined}
            ledgerType={ledgerType}
            onSave={handleSaveTxn}
            onClose={() => { setShowTxnForm(false); setEditTxn(null) }}
            loading={addingTxn || updatingTxn}
          />
        )}
      </Modal>

      {/* ── Delete Account Confirm ── */}
      <ConfirmDialog
        open={!!deleteItemId}
        title={`Delete ${ledgerType === 'banker' ? 'Bank Account' : 'Party'}?`}
        message={`"${itemToDelete?.name}" and all its ${itemToDelete?.transactions?.length ?? 0} transactions will be permanently removed.`}
        onConfirm={handleDeleteItem}
        onCancel={() => setDeleteItemId(null)}
      />

      {/* ── Delete Transaction Confirm ── */}
      <ConfirmDialog
        open={!!deleteTxnId}
        title="Delete Transaction?"
        message={`"${txnToDelete?.description}" — ${txnToDelete ? fmt(txnToDelete.amount) : ''} will be removed and balances will be recalculated.`}
        onConfirm={handleDeleteTxn}
        onCancel={() => setDeleteTxnId(null)}
      />
    </div>
  )
}
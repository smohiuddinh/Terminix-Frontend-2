export const BRAND = '#1a3d26'

export const seedParties = [
  {
    id: 'p1',
    name: 'Cygnuz AI',
    phone: '9876543210',
    address: 'Karachi, Pakistan',
    openingBalance: 50000,
    createdAt: '2024-01-01',
    transactions: [
      { id: 't1', date: '2024-01-05', description: 'Opening Balance',              type: 'debit',  amount: 50000,  note: '' },
      { id: 't2', date: '2024-01-18', description: 'Invoice #1042 – Goods Supply', type: 'debit',  amount: 95000,  note: '' },
      { id: 't3', date: '2024-02-02', description: 'Payment Received',             type: 'credit', amount: 80000,  note: '' },
      { id: 't4', date: '2024-02-20', description: 'Invoice #1078 – Services',     type: 'debit',  amount: 100000, note: '' },
      { id: 't5', date: '2024-03-10', description: 'Partial Payment',              type: 'credit', amount: 100000, note: '' },
    ],
  },
  {
    id: 'p2',
    name: 'Ramesh Traders',
    phone: '9123456780',
    address: 'Karachi, Pakistan',
    openingBalance: 0,
    createdAt: '2024-01-08',
    transactions: [
      { id: 't6', date: '2024-01-10', description: 'Invoice #1031', type: 'debit',  amount: 70000, note: '' },
      { id: 't7', date: '2024-01-25', description: 'Full Payment',  type: 'credit', amount: 70000, note: '' },
      { id: 't8', date: '2024-02-15', description: 'Invoice #1055', type: 'debit',  amount: 50000, note: '' },
      { id: 't9', date: '2024-03-01', description: 'Full Payment',  type: 'credit', amount: 50000, note: '' },
    ],
  },
  {
    id: 'p3',
    name: 'Shyam Enterprises',
    phone: '9988776655',
    address: 'Lahore, Pakistan',
    openingBalance: 0,
    createdAt: '2024-01-06',
    transactions: [
      { id: 't10', date: '2024-01-08', description: 'Invoice #1035',   type: 'debit',  amount: 150000, note: '' },
      { id: 't11', date: '2024-02-01', description: 'Advance Payment', type: 'credit', amount: 90000,  note: '' },
      { id: 't12', date: '2024-02-28', description: 'Invoice #1069',   type: 'debit',  amount: 160000, note: '' },
    ],
  },
]

export const seedBankers = [
  {
    id: 'b1',
    name: 'HBL – Main Branch',
    phone: '02135601234',
    address: 'I.I. Chundrigar Rd, Karachi',
    openingBalance: 500000,
    createdAt: '2024-01-01',
    transactions: [
      { id: 'bt1', date: '2024-01-10', description: 'Opening Deposit',         type: 'credit', amount: 500000, note: '' },
      { id: 'bt2', date: '2024-01-20', description: 'Cheque #44201 Issued',    type: 'debit',  amount: 80000,  note: 'Supplier payment' },
      { id: 'bt3', date: '2024-02-05', description: 'Customer Deposit',        type: 'credit', amount: 120000, note: '' },
      { id: 'bt4', date: '2024-02-22', description: 'Bank Charges',            type: 'debit',  amount: 2500,   note: 'Monthly fee' },
      { id: 'bt5', date: '2024-03-08', description: 'Cheque #44202 Issued',    type: 'debit',  amount: 45000,  note: 'Utility bill' },
    ],
  },
  {
    id: 'b2',
    name: 'MCB Bank – PECHS',
    phone: '02134315000',
    address: 'PECHS Block 6, Karachi',
    openingBalance: 200000,
    createdAt: '2024-01-05',
    transactions: [
      { id: 'bt6', date: '2024-01-05', description: 'Opening Balance',         type: 'credit', amount: 200000, note: '' },
      { id: 'bt7', date: '2024-01-30', description: 'Transfer to HBL',         type: 'debit',  amount: 50000,  note: '' },
      { id: 'bt8', date: '2024-02-18', description: 'Cash Deposit',            type: 'credit', amount: 75000,  note: '' },
    ],
  },
]
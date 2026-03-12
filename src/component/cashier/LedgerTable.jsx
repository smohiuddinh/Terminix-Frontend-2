// src/components/cashier/LedgerTable.jsx
import React from 'react';

export default function LedgerTable({ department }) {
  const transactions = [
    ...department.sales.map(s => ({ ...s, type: 'sale', display: `Sale: ${s.source}` })),
    ...department.expenses.map(e => ({ ...e, type: 'expense', display: `Expense: ${e.type} - ${e.description}` })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  let runningBalance = 0;
  const ledgerEntries = transactions.map(t => {
    if (t.type === 'sale' && t.status === 'Paid') {
      runningBalance += t.amount;
    } else if (t.type === 'expense') {
      runningBalance -= t.amount;
    }
    return { ...t, runningBalance };
  }).reverse(); // show oldest first

  return (
    <div className="bg-white rounded-xl border-2 border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-semibold text-gray-800">Department Ledger</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-5 py-3 text-right text-sm font-medium text-gray-700">Amount</th>
              <th className="px-5 py-3 text-right text-sm font-medium text-gray-700">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ledgerEntries.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-gray-500">
                  No transactions yet
                </td>
              </tr>
            ) : (
              ledgerEntries.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm text-gray-600">{item.date}</td>
                  <td className={`px-5 py-3 text-right font-medium ${
                    item.type === 'sale' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.type === 'sale' ? '+' : '-'}Rs. {item.amount.toLocaleString()}
                  </td>
                  <td className={`px-5 py-3 text-right font-semibold ${
                    item.runningBalance >= 0 ? 'text-green-700' : 'text-red-700'
                  }`}>
                    Rs. {item.runningBalance.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
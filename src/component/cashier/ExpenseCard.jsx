// src/components/cashier/ExpenseCard.jsx
import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function ExpenseCard({ expense, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-medium text-gray-800">{expense.type}</div>
          <div className="text-sm text-gray-600">{expense.description}</div>
          <div className="text-sm text-gray-500">{expense.date}</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Edit expense"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Delete expense"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="text-lg font-bold text-red-700">
        Rs. {expense.amount.toLocaleString()}
      </div>
    </div>
  );
}
// src/components/cashier/SaleCard.jsx
import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function SaleCard({ sale, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-medium text-gray-800">{sale.source}</div>
          <div className="text-sm text-gray-600">{sale.date}</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Edit sale"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Delete sale"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-700">
          Rs. {sale.amount.toLocaleString()}
        </span>
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            sale.status === 'Paid'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {sale.status}
        </span>
      </div>
    </div>
  );
}
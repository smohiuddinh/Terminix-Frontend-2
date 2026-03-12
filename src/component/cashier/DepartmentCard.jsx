// src/components/cashier/DepartmentCard.jsx
import React from 'react';
import { Package } from 'lucide-react';

export default function DepartmentCard({ department, onClick, calculateTotals }) {
  const { totalSales, totalExpenses, balance } = calculateTotals(department);

  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl border-2 border-gray-100 hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
          <Package className="text-emerald-700" size={24} />
        </div>
        <h3 className="font-bold text-gray-800 text-lg mb-1">{department.name}</h3>
        <p className="text-xs text-gray-500 mb-3">{department.fullName}</p>
        <div className="space-y-1">
          <div className="text-xs text-gray-600">Balance</div>
          <div className={`text-xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Rs. {Math.abs(balance).toLocaleString()}
            {balance < 0 ? ' ▼' : ' ▲'}
          </div>
        </div>
      </div>
    </div>
  );
}
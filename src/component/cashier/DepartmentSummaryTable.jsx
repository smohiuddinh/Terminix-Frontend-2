// src/components/cashier/DepartmentSummaryTable.jsx
import React from 'react';

export default function DepartmentSummaryTable({ departments, calculateDeptTotals, onSelectDepartment }) {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Departments Summary</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Sales</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Expenses</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Balance</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {departments.map(dept => {
              const { totalSales, totalExpenses, balance } = calculateDeptTotals(dept);
              return (
                <tr
                  key={dept.id}
                  className="hover:bg-emerald-50 cursor-pointer transition-colors"
                  onClick={() => onSelectDepartment(dept.id)}
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{dept.name}</div>
                    <div className="text-xs text-gray-500">{dept.fullName}</div>
                  </td>
                  <td className="px-6 py-4 text-right text-green-700 font-semibold">
                    Rs. {totalSales.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-red-700 font-semibold">
                    Rs. {totalExpenses.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-800">
                    Rs. {balance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        balance >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {balance >= 0 ? '✓ Profit' : '⚠ Loss'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React from 'react';
import { ArrowLeft, Plus, TrendingUp, TrendingDown, DollarSign, Edit2, Trash2 } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Safely convert any value to a finite number, defaulting to 0. */
const toNum = (v) => {
  const n = Number(v);
  return isFinite(n) ? n : 0;
};

/** Format a number as a locale string with 2 decimal places. */
const fmt = (v) => toNum(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Format a date string or Date object to a readable local date.
 * Falls back to the raw value if parsing fails.
 */
const fmtDate = (raw) => {
  if (!raw) return '—';
  const d = new Date(raw);
  return isNaN(d.getTime())
    ? String(raw)
    : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function DepartmentDetail({
  department,
  calculateDeptTotals,
  onBack,
  onAddSale,
  onEditSale,
  onDeleteSale,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
}) {
  const raw = calculateDeptTotals(department);

  // Safely extract totals — guard against non-numeric API responses
  const totalSales    = toNum(raw.totalSales);
  const totalExpenses = toNum(raw.totalExpenses);
  const balance       = toNum(raw.balance);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{department.fullName}</h1>
            <p className="text-gray-500 mt-1">Department Code: {department.name}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onAddSale}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add Sale
          </button>

          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Sales */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-700 font-medium">Total Sales</p>
              <p className="text-3xl font-bold text-emerald-800 mt-2">
                Rs. {fmt(totalSales)}
              </p>
            </div>
            <div className="p-3 bg-emerald-200 rounded-xl">
              <TrendingUp className="w-8 h-8 text-emerald-700" />
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 font-medium">Total Expenses</p>
              <p className="text-3xl font-bold text-red-800 mt-2">
                Rs. {fmt(totalExpenses)}
              </p>
            </div>
            <div className="p-3 bg-red-200 rounded-xl">
              <TrendingDown className="w-8 h-8 text-red-700" />
            </div>
          </div>
        </div>

        {/* Net Balance */}
        <div
          className={`bg-gradient-to-br p-6 rounded-2xl border ${
            balance >= 0
              ? 'from-blue-50 to-indigo-50 border-blue-200'
              : 'from-orange-50 to-amber-50 border-orange-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: balance >= 0 ? '#1e40af' : '#c2410c' }}
              >
                Net Balance
              </p>
              <p
                className="text-3xl font-bold mt-2"
                style={{ color: balance >= 0 ? '#1e3a8a' : '#9a3412' }}
              >
                Rs. {fmt(balance)}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${balance >= 0 ? 'bg-blue-200' : 'bg-orange-200'}`}>
              <DollarSign
                className="w-8 h-8"
                style={{ color: balance >= 0 ? '#1e40af' : '#c2410c' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sales Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Sales</h2>
          <span className="text-sm text-gray-500">
            {department.sales?.length ?? 0} entries
          </span>
        </div>

        {!department.sales?.length ? (
          <div className="text-center py-12 text-gray-400">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>No sales recorded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                  {/* <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Description</th> */}
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {department.sales.map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    {/* ✅ Fixed: format date from ISO string */}
                    <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
                      {fmtDate(sale.sale_date)}
                    </td>
                    {/* ✅ Fixed: added description column with fallback */}
                    {/* <td className="py-3 px-4 text-sm text-gray-700">
                      {sale.description || <span className="text-gray-400 italic">—</span>}
                    </td> */}
                    {/* ✅ Fixed: amount safely converted to number */}
                    <td className="py-3 px-4 text-right font-semibold text-emerald-600 whitespace-nowrap">
                      Rs. {fmt(sale.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          sale.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-700'
                            : sale.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {sale.status ?? '—'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEditSale(sale)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
                          aria-label="Edit sale"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteSale(sale.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                          aria-label="Delete sale"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Expenses Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Expenses</h2>
          <span className="text-sm text-gray-500">
            {department.expenses?.length ?? 0} entries
          </span>
        </div>

        {!department.expenses?.length ? (
          <div className="text-center py-12 text-gray-400">
            <TrendingDown className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>No expenses recorded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Description</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {department.expenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    {/* ✅ Fixed: format date from ISO string */}
                    <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
                      {fmtDate(expense.expense_date)}
                    </td>
                    {/* ✅ Fixed: null/undefined description fallback */}
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {expense.description || <span className="text-gray-400 italic">—</span>}
                    </td>
                    {/* ✅ Fixed: amount safely converted to number */}
                    <td className="py-3 px-4 text-right font-semibold text-red-600 whitespace-nowrap">
                      Rs. {fmt(expense.amount)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEditExpense(expense)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
                          aria-label="Edit expense"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteExpense(expense.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                          aria-label="Delete expense"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
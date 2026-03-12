import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Plus, Eye } from 'lucide-react';

export default function DashboardOverview({
  departments,
  grandTotals,
  calculateDeptTotals,
  onSelectDepartment,
  onViewDetails,
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
          Cashier Dashboard
        </h1>
        <p className="text-gray-600">Overview of all departments</p>
      </div>

      {/* Grand Total Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Sales Card */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Total Income
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1 font-medium">All Departments Sales</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Rs. {grandTotals.totalSales.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500/10 to-red-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
                <TrendingDown className="text-white" size={24} />
              </div>
              <div className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                Total Expenses
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1 font-medium">All Departments Expenses</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
              Rs. {grandTotals.totalExpenses.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Net Balance Card */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className={`absolute top-0 right-0 w-32 h-32 ${grandTotals.netBalance >= 0 ? 'bg-gradient-to-br from-indigo-500/10 to-blue-500/10' : 'bg-gradient-to-br from-amber-500/10 to-orange-500/10'} rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl ${grandTotals.netBalance >= 0 ? 'bg-gradient-to-br from-indigo-500 to-blue-600 shadow-indigo-500/30' : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30'} flex items-center justify-center shadow-lg`}>
                <Wallet className="text-white" size={24} />
              </div>
              <div className={`text-xs font-semibold ${grandTotals.netBalance >= 0 ? 'text-indigo-600 bg-indigo-50' : 'text-amber-600 bg-amber-50'} px-3 py-1 rounded-full`}>
                {grandTotals.netBalance >= 0 ? 'Profit' : 'Loss'}
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1 font-medium">Net Balance</div>
            <div className={`text-3xl font-bold bg-gradient-to-r ${grandTotals.netBalance >= 0 ? 'from-indigo-600 to-blue-600' : 'from-amber-600 to-orange-600'} bg-clip-text text-transparent`}>
              Rs. {grandTotals.netBalance.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Department Cards Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {departments.map(dept => {
            const { totalSales, totalExpenses, balance } = calculateDeptTotals(dept);
            return (
              <div
                key={dept.id}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Department Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {dept.name}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{dept.fullName}</h3>
                    <p className="text-xs text-gray-500">{dept.sales.length} sales, {dept.expenses.length} expenses</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Sales</span>
                    <span className="font-semibold text-emerald-600">Rs. {totalSales.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Expenses</span>
                    <span className="font-semibold text-rose-600">Rs. {totalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Balance</span>
                      <span className={`font-bold text-lg ${balance >= 0 ? 'text-indigo-600' : 'text-amber-600'}`}>
                        Rs. {balance.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectDepartment(dept.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2.5 rounded-xl hover:from-emerald-700 hover:to-green-700 text-sm font-semibold shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <Plus size={16} />
                    <span>Add Sale</span>
                  </button>
                  <button
                    onClick={() => onViewDetails(dept.id)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2.5 rounded-xl hover:from-indigo-700 hover:to-blue-700 text-sm font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
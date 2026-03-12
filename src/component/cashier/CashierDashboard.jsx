import React, { useState, useMemo } from 'react';
import CashierSidebar from './CashierSidebar';
import DashboardOverview from './DashboardOverview';
import DepartmentDetail from './DepartmentDetail';
import Modal from './Modal';
import SaleForm from './SaleForm';
import ExpenseForm from './ExpenseForm';
import { useQueryClient } from '@tanstack/react-query';
import {
  useAddSale,
  useUpdateSale,
  useAddExpense,
  useUpdateExpense,
  useGetAllSales,
  useGetAllExpenses,
  useDashboardSummary,
  useDepartmentSummary,
  useDeleteSale,
  useDeleteExpense,
  useGetSalesByDepartment,
  useGetExpensesByDepartment,
} from '../../../api/client/cashier';

export default function CashierDashboard() {
  const [activeView, setActiveView]               = useState('dashboard');
  const [activeDeptId, setActiveDeptId]           = useState(null);
  const [showModal, setShowModal]                 = useState(null);
  const [editingItem, setEditingItem]             = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed]   = useState(false);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  const queryClient = useQueryClient();

  const { summary: dashboardSummary, isLoading: dashboardLoading }  = useDashboardSummary();
  const { departments: deptSummary,  isLoading: deptsLoading }      = useDepartmentSummary();
  const { sales: allSales,           isLoading: salesLoading }      = useGetAllSales();
  const { expenses: allExpenses,     isLoading: expensesLoading }   = useGetAllExpenses();

  const { sales: deptSales,       isLoading: deptsalesLoading }     = useGetSalesByDepartment(activeDeptId);
  const { expenses: deptExpenses, isLoading: deptexpensesLoading }  = useGetExpensesByDepartment(activeDeptId);

  const { addSale,      isPending: addingSale }      = useAddSale();
  const { updateSale,   isPending: updatingSale }    = useUpdateSale();
  const { addExpense,   isPending: addingExpense }   = useAddExpense();
  const { updateExpense, isPending: updatingExpense } = useUpdateExpense();
  const { deleteSale }    = useDeleteSale();
  const { deleteExpense } = useDeleteExpense();

  const departments = useMemo(() => {
    const baseDepts = [
      { id: 1, name: 'HLD', fullName: 'HLD Services' },
      { id: 2, name: 'HLF', fullName: 'HLF Services' },
      { id: 3, name: 'GHR', fullName: 'GHR Services' },
      { id: 4, name: 'SF',  fullName: 'SF Services' },
      { id: 5, name: 'ON',  fullName: 'Online Services' },
      { id: 6, name: 'DAR', fullName: 'Daraz Sales' },
      { id: 7, name: 'FUM', fullName: 'Fumigation Services' },
    ];

    return baseDepts.map(dept => {
      const serverDept       = deptSummary?.find(d => d.id === dept.id || d.name === dept.name);
      const deptSalesData    = allSales?.filter(s => s.departmentId === dept.id)    ?? [];
      const deptExpensesData = allExpenses?.filter(e => e.departmentId === dept.id) ?? [];
      return {
        ...dept,
        sales:        deptSalesData,
        expenses:     deptExpensesData,
        serverTotals: serverDept ?? null,
      };
    });
  }, [deptSummary, allSales, allExpenses]);

  const calculateDeptTotals = (dept) => {
    if (dept.serverTotals) {
      const { totalSales = 0, totalExpenses = 0 } = dept.serverTotals;
      return { totalSales, totalExpenses, balance: totalSales - totalExpenses };
    }
    const totalSales    = dept.sales.reduce((sum, s) => sum + (s.status === 'Paid' ? s.amount : 0), 0);
    const totalExpenses = dept.expenses.reduce((sum, e) => sum + e.amount, 0);
    return { totalSales, totalExpenses, balance: totalSales - totalExpenses };
  };

  const grandTotals = useMemo(() => {
    if (dashboardSummary) {
      return {
        totalSales:    Number(dashboardSummary.total_sales    ?? 0),
        totalExpenses: Number(dashboardSummary.total_expenses ?? 0),
        netBalance:    Number(dashboardSummary.net_balance    ?? 0),
      };
    }
    let totalSales = 0, totalExpenses = 0;
    departments.forEach(dept => {
      const { totalSales: s, totalExpenses: e } = calculateDeptTotals(dept);
      totalSales    += s;
      totalExpenses += e;
    });
    return { totalSales, totalExpenses, netBalance: totalSales - totalExpenses };
  }, [dashboardSummary, departments]);

  const activeDepartment = useMemo(() => {
    if (!activeDeptId) return null;
    const dept = departments.find(d => d.id === activeDeptId);
    if (!dept) return null;
    return {
      ...dept,
      sales:    deptSales    ?? [],
      expenses: deptExpenses ?? [],
    };
  }, [activeDeptId, departments, deptSales, deptExpenses]);

  const quickStats = useMemo(() => {
    return departments.map(dept => {
      const { balance } = calculateDeptTotals(dept);
      return { label: dept.name, value: balance };
    });
  }, [departments]);

  const closeModal = () => {
    setShowModal(null);
    setEditingItem(null);
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["cashier:allSales"] });
    queryClient.invalidateQueries({ queryKey: ["cashier:allExpenses"] });
    queryClient.invalidateQueries({ queryKey: ["cashier:dashboardSummary"] });
    queryClient.invalidateQueries({ queryKey: ["cashier:departmentSummary"] });
    if (activeDeptId) {
      queryClient.invalidateQueries({ queryKey: ["cashier:salesByDepartment", activeDeptId] });
      queryClient.invalidateQueries({ queryKey: ["cashier:expensesByDepartment", activeDeptId] });
    }
  };

  const handleSaleSubmit = (data) => {
    const payload = { ...data, departmentId: activeDepartment.id };
    if (editingItem) {
      updateSale(
        { id: editingItem.id, ...payload },
        { onSuccess: () => { invalidateAll(); closeModal(); } }
      );
    } else {
      addSale(payload, { onSuccess: () => { invalidateAll(); closeModal(); } });
    }
  };

  const handleExpenseSubmit = (data) => {
    const payload = { ...data, departmentId: activeDepartment.id };
    if (editingItem) {
      updateExpense(
        { id: editingItem.id, ...payload },
        { onSuccess: () => { invalidateAll(); closeModal(); } }
      );
    } else {
      addExpense(payload, { onSuccess: () => { invalidateAll(); closeModal(); } });
    }
  };

  const handleDeleteSale = (saleId) => {
    if (!confirm('Are you sure you want to delete this sale?')) return;
    deleteSale(saleId, { onSuccess: invalidateAll });
  };

  const handleDeleteExpense = (expenseId) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    deleteExpense(expenseId, { onSuccess: invalidateAll });
  };

  const isLoading =
    dashboardLoading ||
    deptsLoading ||
    salesLoading ||
    expensesLoading ||
    (activeView === 'department' && (deptsalesLoading || deptexpensesLoading));

  const salePending    = editingItem ? updatingSale    : addingSale;
  const expensePending = editingItem ? updatingExpense : addingExpense;

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col lg:flex-row">
      <CashierSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        showMobile={showSidebarMobile}
        onCloseMobile={() => setShowSidebarMobile(false)}
        onMenuItemClick={() => {
          setActiveView('dashboard');
          setActiveDeptId(null);
          setEditingItem(null);
        }}
        quickStats={quickStats}
      />

      <button
        className="lg:hidden p-2 fixed top-4 left-4 z-50 bg-white rounded-lg shadow-md"
        onClick={() => setShowSidebarMobile(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {isLoading && (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            Loading...
          </div>
        )}

        {!isLoading && activeView === 'dashboard' && (
          <DashboardOverview
            departments={departments}
            grandTotals={grandTotals}
            calculateDeptTotals={calculateDeptTotals}
            onSelectDepartment={(id) => {
              setActiveDeptId(id);
              setActiveView('department');
            }}
            onViewDetails={(id) => {
              setActiveDeptId(id);
              setActiveView('department');
            }}
          />
        )}

        {!isLoading && activeView === 'department' && activeDepartment && (
          <DepartmentDetail
            department={activeDepartment}
            calculateDeptTotals={calculateDeptTotals}
            onBack={() => {
              setActiveView('dashboard');
              setActiveDeptId(null);
              setEditingItem(null);
            }}
            onAddSale={() => setShowModal('sale')}
            onEditSale={(sale) => { setEditingItem(sale); setShowModal('sale'); }}
            onDeleteSale={handleDeleteSale}
            onAddExpense={() => setShowModal('expense')}
            onEditExpense={(exp) => { setEditingItem(exp); setShowModal('expense'); }}
            onDeleteExpense={handleDeleteExpense}
          />
        )}
      </main>

      {showModal === 'sale' && activeDepartment && (
        <Modal
          title={editingItem ? 'Edit Sale' : `Add Sale - ${activeDepartment.fullName}`}
          onClose={closeModal}
        >
          <SaleForm
            departmentId={activeDepartment.id}
            initialData={editingItem}
            isPending={salePending}
            onSubmit={handleSaleSubmit}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {showModal === 'expense' && activeDepartment && (
        <Modal
          title={editingItem ? 'Edit Expense' : `Add Expense - ${activeDepartment.fullName}`}
          onClose={closeModal}
        >
          <ExpenseForm
            departmentId={activeDepartment.id}
            initialData={editingItem}
            isPending={expensePending}
            onSubmit={handleExpenseSubmit}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  );
}
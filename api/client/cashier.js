import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addSaleRequest,
  addExpenseRequest,
  getAllSalesRequest,
  getAllExpensesRequest,
  getDashboardSummaryRequest,
  getDepartmentSummaryRequest,
  getDateSummaryRequest,
  deleteSaleRequest,
  deleteExpenseRequest,
  getSalesByDepartmentRequest,
  getExpensesByDepartmentRequest,
  updateExpenseRequest,
  updateSaleRequest,
} from "../services/cashierService";

// ======================
// 1️⃣ Add Sale
// ======================
export function useAddSale() {
  const { mutate: addSale, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: (data) => addSaleRequest(data),
    onSuccess: () => toast.success("Sale added successfully!"),
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to add sale!"),
  });
  return { addSale, isSuccess, isPending, isError, error };
}

// ======================
// 2️⃣ Add Expense
// ======================
export function useAddExpense() {
  const { mutate: addExpense, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: (data) => addExpenseRequest(data),
    onSuccess: () => toast.success("Expense added successfully!"),
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to add expense!"),
  });
  return { addExpense, isSuccess, isPending, isError, error };
}

// ======================
// 3️⃣ Get All Sales
// ======================
export function useGetAllSales() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashier:allSales"],
    queryFn: async () => {
      const res = await getAllSalesRequest();
      return res.data.data;
    },
  });
  return { sales: data, isLoading, isError, error };
}

// ======================
// 4️⃣ Get All Expenses
// ======================
export function useGetAllExpenses() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashier:allExpenses"],
    queryFn: async () => {
      const res = await getAllExpensesRequest();
      return res.data.data;
    },
  });
  return { expenses: data, isLoading, isError, error };
}

// ======================
// 5️⃣ Dashboard Summary
// ======================
export function useDashboardSummary() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashier:dashboardSummary"],
    queryFn: async () => {
      const res = await getDashboardSummaryRequest();
      return res.data.data;
    },
  });
  return { summary: data, isLoading, isError, error };
}

// ======================
// 6️⃣ Department Summary
// ======================
export function useDepartmentSummary() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashier:departmentSummary"],
    queryFn: async () => {
      const res = await getDepartmentSummaryRequest();
      return res.data.data;
    },
  });
  return { departments: data, isLoading, isError, error };
}

// ======================
// 7️⃣ Date Range Summary
// ======================
export function useDateSummary(start, end) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashier:dateSummary", start, end],
    queryFn: async () => {
      const res = await getDateSummaryRequest(start, end);
      return res.data.data;
    },
    enabled: !!start && !!end, // only fetch if start & end are defined
  });
  return { summary: data, isLoading, isError, error };
}

export function useDeleteSale() {
  const { mutate: deleteSale, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (id) => deleteSaleRequest(id),
    onSuccess: () => toast.success("Sale deleted successfully!"),
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to delete sale!"),
  });
  return { deleteSale, isPending, isSuccess, isError, error };
}

// ======================
// 9️⃣ Delete Expense
// ======================
export function useDeleteExpense() {
  const { mutate: deleteExpense, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (id) => deleteExpenseRequest(id),
    onSuccess: () => toast.success("Expense deleted successfully!"),
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to delete expense!"),
  });
  return { deleteExpense, isPending, isSuccess, isError, error };
}



export function useGetSalesByDepartment(departmentId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashier:salesByDepartment", departmentId],
    queryFn: async () => {
      const res = await getSalesByDepartmentRequest(departmentId);
      return res.data.data;
    },
    enabled: !!departmentId, // only fetch if departmentId exists
  });
  return { sales: data, isLoading, isError, error };
}

export function useGetExpensesByDepartment(departmentId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashier:expensesByDepartment", departmentId],
    queryFn: async () => {
      const res = await getExpensesByDepartmentRequest(departmentId);
      return res.data.data;
    },
    enabled: !!departmentId,
  });
  return { expenses: data, isLoading, isError, error };
}


export function useUpdateExpense() {
  const { mutate: updateExpense, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: (payload) => updateExpenseRequest(payload),
    onSuccess: () => toast.success("Expense updated successfully!"),
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to update expense!"),
  });
  return { updateExpense, isSuccess, isPending, isError, error };
}


export function useUpdateSale() {
  const { mutate: updateSale, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: (payload) => updateSaleRequest(payload),
    onSuccess: () => toast.success("Sale updated successfully!"),
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to update sale!"),
  });
  return { updateSale, isSuccess, isPending, isError, error };
}
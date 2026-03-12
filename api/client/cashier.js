import { toast } from "react-toastify";
import api from "../axios";
import API_ROUTE from "../endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";

// ======================
// 1️⃣ Add Sale
// ======================
export function useAddSale() {
  const { mutate: addSale, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) => await api.post(API_ROUTE.cashier.addSale, data),
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
    mutationFn: async (data) => await api.post(API_ROUTE.cashier.addExpense, data),
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
    queryKey: ["allSales"],
    queryFn: async () => {
      const res = await api.get(API_ROUTE.cashier.getAllSales);
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
    queryKey: ["allExpenses"],
    queryFn: async () => {
      const res = await api.get(API_ROUTE.cashier.getAllExpenses);
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
    queryKey: ["dashboardSummary"],
    queryFn: async () => {
      const res = await api.get(API_ROUTE.cashier.dashboardSummary);
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
    queryKey: ["departmentSummary"],
    queryFn: async () => {
      const res = await api.get(API_ROUTE.cashier.departmentSummary);
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
    queryKey: ["dateSummary", start, end],
    queryFn: async () => {
      const res = await api.get(`${API_ROUTE.cashier.dateSummary}?start=${start}&end=${end}`);
      return res.data.data;
    },
    enabled: !!start && !!end, // only fetch if start & end are defined
  });
  return { summary: data, isLoading, isError, error };
}

export function useDeleteSale() {
  const { mutate: deleteSale, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (id) => await api.delete(`${API_ROUTE.cashier.deleteSale}/${id}`),
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
    mutationFn: async (id) => await api.delete(`${API_ROUTE.cashier.deleteExpense}/${id}`),
    onSuccess: () => toast.success("Expense deleted successfully!"),
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to delete expense!"),
  });
  return { deleteExpense, isPending, isSuccess, isError, error };
}



export function useGetSalesByDepartment(departmentId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["salesByDepartment", departmentId],
    queryFn: async () => {
      const res = await api.get(`${API_ROUTE.cashier.getSalesByDepartment}/${departmentId}`);
      return res.data.data;
    },
    enabled: !!departmentId, // only fetch if departmentId exists
  });
  return { sales: data, isLoading, isError, error };
}

export function useGetExpensesByDepartment(departmentId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["expensesByDepartment", departmentId],
    queryFn: async () => {
      const res = await api.get(`${API_ROUTE.cashier.getExpensesByDepartment}/${departmentId}`);
      return res.data.data;
    },
    enabled: !!departmentId,
  });
  return { expenses: data, isLoading, isError, error };
}


export function useUpdateExpense() {
  const { mutate: updateExpense, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async ({ id, ...data }) =>
      await api.put(`${API_ROUTE.cashier.updateExpense}/${id}`, data),
    onSuccess: () => toast.success("Expense updated successfully!"),
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to update expense!"),
  });
  return { updateExpense, isSuccess, isPending, isError, error };
}


export function useUpdateSale() {
  const { mutate: updateSale, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async ({ id, ...data }) =>
      await api.put(`${API_ROUTE.cashier.updateSale}/${id}`, data),
    onSuccess: () => toast.success("Sale updated successfully!"),
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to update sale!"),
  });
  return { updateSale, isSuccess, isPending, isError, error };
}
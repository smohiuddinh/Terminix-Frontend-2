import api from "../axios";
import API_ROUTE from "../endpoints";

export const addSaleRequest = (data) =>
  api.post(API_ROUTE.cashier.addSale, data);

export const addExpenseRequest = (data) =>
  api.post(API_ROUTE.cashier.addExpense, data);

export const getAllSalesRequest = () =>
  api.get(API_ROUTE.cashier.getAllSales);

export const getAllExpensesRequest = () =>
  api.get(API_ROUTE.cashier.getAllExpenses);

export const getDashboardSummaryRequest = () =>
  api.get(API_ROUTE.cashier.dashboardSummary);

export const getDepartmentSummaryRequest = () =>
  api.get(API_ROUTE.cashier.departmentSummary);

export const getDateSummaryRequest = (start, end) =>
  api.get(`${API_ROUTE.cashier.dateSummary}?start=${start}&end=${end}`);

export const deleteSaleRequest = (id) =>
  api.delete(`${API_ROUTE.cashier.deleteSale}/${id}`);

export const deleteExpenseRequest = (id) =>
  api.delete(`${API_ROUTE.cashier.deleteExpense}/${id}`);

export const getSalesByDepartmentRequest = (departmentId) =>
  api.get(`${API_ROUTE.cashier.getSalesByDepartment}/${departmentId}`);

export const getExpensesByDepartmentRequest = (departmentId) =>
  api.get(`${API_ROUTE.cashier.getExpensesByDepartment}/${departmentId}`);

export const updateExpenseRequest = ({ id, ...data }) =>
  api.put(`${API_ROUTE.cashier.updateExpense}/${id}`, data);

export const updateSaleRequest = ({ id, ...data }) =>
  api.put(`${API_ROUTE.cashier.updateSale}/${id}`, data);


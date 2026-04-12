import api from "../axios";
import API_ROUTE from "../endpoints";

// ═══════════════════════════════════════════════════════════════════
// SHEETS
// ═══════════════════════════════════════════════════════════════════

// GET /sheets?page=1&limit=20&date=2025-01-15&search=keyword
export const getSheetListRequest = (params = {}) =>
  api.get(API_ROUTE.cashier.getSheetList, { params });

// GET /sheets/date/:date
export const getSheetsByDateRequest = (date) =>
  api.get(`${API_ROUTE.cashier.getSheetsByDate}/${date}`);

// GET /sheets/:id
export const getSheetByIdRequest = (id) =>
  api.get(`${API_ROUTE.cashier.getSheetById}/${id}`);

// POST /sheets
export const createSheetRequest = (sheetData) =>
  api.post(API_ROUTE.cashier.createSheet, sheetData);

// PUT /sheets/:id
export const updateSheetRequest = ({ id, ...sheetData }) =>
  api.put(`${API_ROUTE.cashier.updateSheet}/${id}`, sheetData);

// DELETE /sheets/:id
export const deleteSheetRequest = (id) =>
  api.delete(`${API_ROUTE.cashier.deleteSheet}/${id}`);

// ═══════════════════════════════════════════════════════════════════
// PAGINATED ENTRY LISTS
// ═══════════════════════════════════════════════════════════════════

// GET /sheets/:id/opening-entries?page=1&limit=10
export const getOpeningEntriesRequest = (sheetId, params = {}) =>
  api.get(`${API_ROUTE.cashier.getOpeningEntries}/${sheetId}/opening-entries`, { params });

// GET /sheets/:id/collections?page=1&limit=10
export const getCollectionsRequest = (sheetId, params = {}) =>
  api.get(`${API_ROUTE.cashier.getCollections}/${sheetId}/collections`, { params });

// GET /sheets/:id/expenses?page=1&limit=10
export const getSheetExpensesRequest = (sheetId, params = {}) =>
  api.get(`${API_ROUTE.cashier.getExpenses}/${sheetId}/expenses`, { params });

// GET /sheets/:id/department-sales?department=HLD&page=1&limit=10
export const getDepartmentSalesRequest = (sheetId, params = {}) =>
  api.get(`${API_ROUTE.cashier.getDepartmentSales}/${sheetId}/department-sales`, { params });

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD & SUMMARY
// ═══════════════════════════════════════════════════════════════════

// GET /dashboard/summary?date=2025-01-15
export const getDashboardSummaryRequest = (date) =>
  api.get(API_ROUTE.cashier.dashboardSummary, { params: date ? { date } : {} });

// GET /dashboard/departments?sheetId=2025-01-15-1
export const getDepartmentSummaryRequest = (sheetId) =>
  api.get(API_ROUTE.cashier.departmentSummary, { params: { sheetId } });

// GET /dashboard/sheet-summary/:id
export const getSheetSummaryRequest = (id) =>
  api.get(`${API_ROUTE.cashier.sheetSummary}/${id}`);

// GET /dashboard/history?start=&end=&page=1&limit=20
export const getHistorySummaryRequest = (params = {}) =>
  api.get(API_ROUTE.cashier.historySummary, { params });
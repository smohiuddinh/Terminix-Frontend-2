import { toast } from "react-toastify";
import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSheetListRequest,
  getSheetsByDateRequest,
  getSheetByIdRequest,
  createSheetRequest,
  updateSheetRequest,
  deleteSheetRequest,
  getOpeningEntriesRequest,
  getCollectionsRequest,
  getSheetExpensesRequest,
  getDepartmentSalesRequest,
  getDashboardSummaryRequest,
  getDepartmentSummaryRequest,
  getSheetSummaryRequest,
  getHistorySummaryRequest,
} from "../services/cashierService";
import { normalizeDate } from "../../utils/helper";

// ─── Safe pagination extractor ────────────────────────────────────────────────
function extractPage(response) {
  if (response?.pagination) return response;
  const body = response?.data;
  if (body?.pagination) return body;
  if (body?.data?.pagination) return body.data;
  const items = body?.data ?? body ?? response ?? [];
  return {
    data: Array.isArray(items) ? items : [],
    pagination: { hasNextPage: false, page: 1, limit: 20, total: 0, totalPages: 1 },
  };
}

function getNext(lastPage) {
  return lastPage?.pagination?.hasNextPage
    ? lastPage.pagination.page + 1
    : undefined;
}

// ─── Helper: normalize date fields on a sheet object ─────────────────────────
// Server se aane wali date UTC-shifted hoti hai (e.g. "2026-04-12T19:00:00.000Z").
// normalizeDate() sirf YYYY-MM-DD string return karta hai bina timezone shift ke.
function fixSheetDate(sheet) {
  if (!sheet) return sheet;
  return {
    ...sheet,
    date: normalizeDate(sheet.date ?? sheet.sheet_date),
  };
}

// ═══════════════════════════════════════════════════════════════════
// SHEETS
// ═══════════════════════════════════════════════════════════════════

export function useGetSheetList(filters = {}) {
  return useInfiniteQuery({
    queryKey: ["cashier:sheetList", filters],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getSheetListRequest({ page: pageParam, limit: 20, ...filters }).then(res => {
        const page = extractPage(res);
        return {
          ...page,
          // date field normalize karo history sidebar ke liye
          data: page.data.map(fixSheetDate),
        };
      }),
    getNextPageParam: getNext,
  });
}

export function useGetSheetsByDate(date) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashier:sheetsByDate", date],
    queryFn: async () => {
      const res = await getSheetsByDateRequest(date);
      const sheets = res?.data?.data ?? res?.data ?? [];
      return sheets.map(fixSheetDate);
    },
    enabled: !!date,
  });
  return { sheets: data ?? [], isLoading, isError, error };
}

export function useGetSheetById(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashier:sheet", id],
    queryFn: async () => {
      const res = await getSheetByIdRequest(id);
      const sheet = res?.data?.data ?? null;
      // FIX: UTC date shift hatao — server "2026-04-12T19:00:00Z" deta hai
      // jo Pakistan mein ek din peeche dikhta hai. fixSheetDate sirf date
      // string ka YYYY-MM-DD part leta hai.
      return fixSheetDate(sheet);
    },
    enabled: !!id,
  });
  return { sheet: data ?? null, isLoading, isError, error };
}

export function useCreateSheet() {
  const qc = useQueryClient();
  const {
    mutate: createSheet,
    mutateAsync: createSheetAsync,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: (sheetData) => createSheetRequest(sheetData),

    onSuccess: () => {
      toast.success("Sheet created!");
      qc.invalidateQueries({ queryKey: ["cashier:sheetList"] });
    },

    onError: (err) => {
      const status  = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 409) {
        toast.info(message || "Sheet already exists, loading existing sheet.");
        qc.invalidateQueries({ queryKey: ["cashier:sheetList"] });
        return;
      }

      toast.error(message || "Failed to create sheet!");
    },
  });

  return { createSheet, createSheetAsync, isPending, isSuccess, isError, error, data };
}

export function useUpdateSheet() {
  const qc = useQueryClient();
  const { mutate: updateSheet, mutateAsync: updateSheetAsync, isPending, isError, error } = useMutation({
    mutationFn: (sheetData) => updateSheetRequest(sheetData),
    onSuccess: (_, variables) => {
      const id = variables?.id;
      if (id) {
        qc.invalidateQueries({ queryKey: ["cashier:sheet", id] });
        qc.invalidateQueries({ queryKey: ["cashier:sheetSummary", id] });
      }
      qc.invalidateQueries({ queryKey: ["cashier:sheetList"] });
      qc.invalidateQueries({ queryKey: ["cashier:dashboardSummary"] });
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to save sheet!"),
  });
  return { updateSheet, updateSheetAsync, isPending, isError, error };
}

export function useDeleteSheet() {
  const qc = useQueryClient();
  const { mutate: deleteSheet, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (id) => deleteSheetRequest(id),
    onSuccess: (_, id) => {
      toast.success("Sheet deleted!");
      qc.invalidateQueries({ queryKey: ["cashier:sheetList"] });
      qc.removeQueries({ queryKey: ["cashier:sheet", id] });
      qc.removeQueries({ queryKey: ["cashier:sheetSummary", id] });
      qc.invalidateQueries({ queryKey: ["cashier:dashboardSummary"] });
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to delete sheet!"),
  });
  return { deleteSheet, isPending, isSuccess, isError, error };
}

// ═══════════════════════════════════════════════════════════════════
// PAGINATED ENTRY LISTS — infinite scroll
// ═══════════════════════════════════════════════════════════════════

export function useGetOpeningEntries(sheetId) {
  return useInfiniteQuery({
    queryKey: ["cashier:openingEntries", sheetId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getOpeningEntriesRequest(sheetId, { page: pageParam, limit: 10 }).then(extractPage),
    getNextPageParam: getNext,
    enabled: !!sheetId,
  });
}

export function useGetCollections(sheetId) {
  return useInfiniteQuery({
    queryKey: ["cashier:collections", sheetId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getCollectionsRequest(sheetId, { page: pageParam, limit: 10 }).then(extractPage),
    getNextPageParam: getNext,
    enabled: !!sheetId,
  });
}

export function useGetSheetExpenses(sheetId) {
  return useInfiniteQuery({
    queryKey: ["cashier:sheetExpenses", sheetId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getSheetExpensesRequest(sheetId, { page: pageParam, limit: 10 }).then(extractPage),
    getNextPageParam: getNext,
    enabled: !!sheetId,
  });
}

export function useGetDepartmentSales(sheetId, department = null) {
  return useInfiniteQuery({
    queryKey: ["cashier:deptSales", sheetId, department],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getDepartmentSalesRequest(sheetId, {
        page: pageParam,
        limit: 10,
        ...(department ? { department } : {}),
      }).then(extractPage),
    getNextPageParam: getNext,
    enabled: !!sheetId,
  });
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD & SUMMARY
// ═══════════════════════════════════════════════════════════════════

export function useDashboardSummary(date = null) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashier:dashboardSummary", date],
    queryFn: async () => {
      const res = await getDashboardSummaryRequest(date);
      return res?.data?.data ?? null;
    },
  });
  return { summary: data ?? null, isLoading, isError, error };
}

export function useDepartmentSummary(sheetId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashier:departmentSummary", sheetId],
    queryFn: async () => {
      const res = await getDepartmentSummaryRequest(sheetId);
      return res?.data?.data ?? null;
    },
    enabled: !!sheetId,
  });
  return { departments: data ?? null, isLoading, isError, error };
}

export function useSheetSummary(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashier:sheetSummary", id],
    queryFn: async () => {
      const res = await getSheetSummaryRequest(id);
      return res?.data?.data ?? null;
    },
    enabled: !!id,
  });
  return { summary: data ?? null, isLoading, isError, error };
}

export function useHistorySummary(filters = {}) {
  const hasDateRange = !!filters.start && !!filters.end;

  return useInfiniteQuery({
    queryKey: ["cashier:history", filters],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getHistorySummaryRequest({ page: pageParam, limit: 20, ...filters }).then(res => {
        const page = extractPage(res);
        return {
          ...page,
          // history list mein bhi dates normalize karo
          data: page.data.map(fixSheetDate),
        };
      }),
    getNextPageParam: getNext,
    enabled: hasDateRange,
    staleTime: 2 * 60 * 1000,
  });
}
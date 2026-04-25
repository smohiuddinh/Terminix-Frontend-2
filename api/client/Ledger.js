import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAccountsRequest,
  getAccountByIdRequest,
  createAccountRequest,
  updateAccountRequest,
  deleteAccountRequest,
  getTransactionsRequest,
  addTransactionRequest,
  updateTransactionRequest,
  deleteTransactionRequest,
  getLedgerSummaryRequest,
} from "../services/ledgerService";

// ─────────────────────────────────────────────────────────────────────────────
// HELPER — server response se account data safely nikalta hai
// Backend har mutation mein fresh full account (with transactions) return karta hai
// ─────────────────────────────────────────────────────────────────────────────
function extractAccount(res) {
  return res?.data?.data ?? null;
}

// ═══════════════════════════════════════════════════════════════════
// ACCOUNTS — READ
// ═══════════════════════════════════════════════════════════════════

/**
 * GET /ledger/accounts?ledgerType=party&search=&status=&page=&limit=
 * Summary list — transactions array empty hoga (list view ke liye kaafi hai)
 */
export function useGetAccounts(filters = {}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ledger:accounts", filters],
    queryFn: async () => {
      const res = await getAccountsRequest(filters);
      return res?.data?.data ?? [];
    },
  });
  return { accounts: data ?? [], isLoading, isError, error };
}

/**
 * GET /ledger/accounts/:id
 * Full account with all transactions (running balance included)
 */
export function useGetAccountById(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ledger:account", id],
    queryFn: async () => {
      const res = await getAccountByIdRequest(id);
      return extractAccount(res);
    },
    enabled: !!id,
  });
  return { account: data ?? null, isLoading, isError, error };
}

// ═══════════════════════════════════════════════════════════════════
// ACCOUNTS — MUTATIONS
// ═══════════════════════════════════════════════════════════════════

export function useCreateAccount() {
  const qc = useQueryClient();
  const {
    mutate: createAccount,
    mutateAsync: createAccountAsync,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: (accountData) => createAccountRequest(accountData),

    onSuccess: (res) => {
      toast.success("Account created!");
      // List invalidate karo — naya account appear ho
      qc.invalidateQueries({ queryKey: ["ledger:accounts"] });
      qc.invalidateQueries({ queryKey: ["ledger:summary"] });
    },

    onError: (err) => {
      const status  = err?.response?.status;
      const message = err?.response?.data?.message;
      if (status === 409) {
        toast.info(message || "Account already exists.");
        return;
      }
      toast.error(message || "Failed to create account!");
    },
  });

  return { createAccount, createAccountAsync, isPending, isSuccess, isError, error, data };
}

export function useUpdateAccount() {
  const qc = useQueryClient();
  const {
    mutate: updateAccount,
    mutateAsync: updateAccountAsync,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (accountData) => updateAccountRequest(accountData),

    onSuccess: (res, variables) => {
      toast.success("Account updated!");
      const id = variables?.id;
      if (id) qc.invalidateQueries({ queryKey: ["ledger:account", id] });
      qc.invalidateQueries({ queryKey: ["ledger:accounts"] });
      qc.invalidateQueries({ queryKey: ["ledger:summary"] });
    },

    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to update account!"),
  });

  return { updateAccount, updateAccountAsync, isPending, isError, error };
}

export function useDeleteAccount() {
  const qc = useQueryClient();
  const {
    mutate: deleteAccount,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (id) => deleteAccountRequest(id),

    onSuccess: (_, id) => {
      toast.success("Account deleted!");
      qc.removeQueries({ queryKey: ["ledger:account", id] });
      qc.invalidateQueries({ queryKey: ["ledger:accounts"] });
      qc.invalidateQueries({ queryKey: ["ledger:summary"] });
    },

    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to delete account!"),
  });

  return { deleteAccount, isPending, isSuccess, isError, error };
}

// ═══════════════════════════════════════════════════════════════════
// TRANSACTIONS
// ═══════════════════════════════════════════════════════════════════

/**
 * GET /ledger/accounts/:id/transactions?page=&limit=&status=&type=&search=
 * Paginated — agar filtered view chahiye toh yeh use karo.
 * Normal use case mein useGetAccountById kaafi hai (sab txns ek saath aate hain).
 */
export function useGetTransactions(accountId, filters = {}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ledger:transactions", accountId, filters],
    queryFn: async () => {
      const res = await getTransactionsRequest(accountId, filters);
      return res?.data ?? null;
    },
    enabled: !!accountId,
  });
  return {
    transactions: data?.data         ?? [],
    pagination:   data?.pagination   ?? null,
    isLoading,
    isError,
    error,
  };
}

/**
 * POST /ledger/accounts/:id/transactions
 * Backend fresh full account return karta hai — cache update bhi hoti hai
 */
export function useAddTransaction() {
  const qc = useQueryClient();
  const {
    mutate: addTransaction,
    mutateAsync: addTransactionAsync,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ accountId, ...txnData }) =>
      addTransactionRequest(accountId, txnData),

    onSuccess: (res, variables) => {
      toast.success("Transaction added!");
      const updatedAccount = extractAccount(res);
      const id = variables?.accountId;

      // Cache directly update karo — refetch nahi chahiye
      if (id && updatedAccount) {
        qc.setQueryData(["ledger:account", id], updatedAccount);
      }
      // List summary (balance) bhi update hogi
      qc.invalidateQueries({ queryKey: ["ledger:accounts"] });
      qc.invalidateQueries({ queryKey: ["ledger:summary"] });
    },

    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to add transaction!"),
  });

  return { addTransaction, addTransactionAsync, isPending, isError, error };
}

/**
 * PUT /ledger/accounts/:accountId/transactions/:txnId
 */
export function useUpdateTransaction() {
  const qc = useQueryClient();
  const {
    mutate: updateTransaction,
    mutateAsync: updateTransactionAsync,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (data) => updateTransactionRequest(data),

    onSuccess: (res, variables) => {
      toast.success("Transaction updated!");
      const updatedAccount = extractAccount(res);
      const id = variables?.accountId;

      if (id && updatedAccount) {
        qc.setQueryData(["ledger:account", id], updatedAccount);
      }
      qc.invalidateQueries({ queryKey: ["ledger:accounts"] });
      qc.invalidateQueries({ queryKey: ["ledger:summary"] });
    },

    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to update transaction!"),
  });

  return { updateTransaction, updateTransactionAsync, isPending, isError, error };
}

/**
 * DELETE /ledger/accounts/:accountId/transactions/:txnId
 */
export function useDeleteTransaction() {
  const qc = useQueryClient();
  const {
    mutate: deleteTransaction,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (data) => deleteTransactionRequest(data),

    onSuccess: (res, variables) => {
      toast.success("Transaction deleted!");
      const updatedAccount = extractAccount(res);
      const id = variables?.accountId;

      if (id && updatedAccount) {
        qc.setQueryData(["ledger:account", id], updatedAccount);
      }
      qc.invalidateQueries({ queryKey: ["ledger:accounts"] });
      qc.invalidateQueries({ queryKey: ["ledger:summary"] });
    },

    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to delete transaction!"),
  });

  return { deleteTransaction, isPending, isError, error };
}

// ═══════════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════════

/** GET /ledger/summary?ledgerType=party */
export function useLedgerSummary(ledgerType = null) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ledger:summary", ledgerType],
    queryFn: async () => {
      const res = await getLedgerSummaryRequest(ledgerType);
      return res?.data?.data ?? null;
    },
  });
  return { summary: data ?? null, isLoading, isError, error };
}
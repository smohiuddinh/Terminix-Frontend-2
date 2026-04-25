import api from "../axios";
import API_ROUTE from "../endpoints";

const R = API_ROUTE.ledger;

// ═══════════════════════════════════════════════════════════════════
// ACCOUNTS
// ═══════════════════════════════════════════════════════════════════

/** GET /ledger/accounts?ledgerType=party&search=ali&status=active&page=1&limit=20 */
export const getAccountsRequest = (params = {}) =>
  api.get(R.getAccounts, { params });

/** GET /ledger/accounts/:id  — full detail with transactions */
export const getAccountByIdRequest = (id) =>
  api.get(`${R.getAccountById}/${id}`);

/** POST /ledger/accounts */
export const createAccountRequest = (data) =>
  api.post(R.createAccount, data);

/** PUT /ledger/accounts/:id */
export const updateAccountRequest = ({ id, ...data }) =>
  api.put(`${R.updateAccount}/${id}`, data);

/** DELETE /ledger/accounts/:id */
export const deleteAccountRequest = (id) =>
  api.delete(`${R.deleteAccount}/${id}`);

// ═══════════════════════════════════════════════════════════════════
// TRANSACTIONS
// ═══════════════════════════════════════════════════════════════════

/**
 * GET /ledger/accounts/:id/transactions
 * ?page=1&limit=50&status=pending&type=debit&search=xyz
 */
export const getTransactionsRequest = (accountId, params = {}) =>
  api.get(`${R.getTransactions}/${accountId}/transactions`, { params });

/** POST /ledger/accounts/:id/transactions */
export const addTransactionRequest = (accountId, data) =>
  api.post(`${R.addTransaction}/${accountId}/transactions`, data);

/** PUT /ledger/accounts/:accountId/transactions/:txnId */
export const updateTransactionRequest = ({ accountId, txnId, ...data }) =>
  api.put(`${R.updateTransaction}/${accountId}/transactions/${txnId}`, data);

/** DELETE /ledger/accounts/:accountId/transactions/:txnId */
export const deleteTransactionRequest = ({ accountId, txnId }) =>
  api.delete(`${R.deleteTransaction}/${accountId}/transactions/${txnId}`);

// ═══════════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════════

/** GET /ledger/summary?ledgerType=party */
export const getLedgerSummaryRequest = (ledgerType = null) =>
  api.get(R.summary, { params: ledgerType ? { ledgerType } : {} });
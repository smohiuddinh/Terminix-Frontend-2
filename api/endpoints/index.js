const API_ROUTE = {
  user: {
    login: "/auth/signIn",
    signUp: "/auth/signUp",
    sendOtp: "/auth/sendOtp",
    submitOtp: "/auth/submitOtp",
    checkapi: "/auth/checkapi",
    changePasword: "/auth/changePasword",
    getAllUsers: "/auth/get-all-users"
  },

cashier: {
    getSheetList:         "/cashier/sheets",              // GET    ?page=1&limit=20&date=&search=
    getSheetsByDate:      "/cashier/sheets/date",         // GET    /cashier/sheets/date/:date
    getSheetById:         "/cashier/sheets",              // GET    /cashier/sheets/:id
    createSheet:          "/cashier/sheets",              // POST
    updateSheet:          "/cashier/sheets",              // PUT    /cashier/sheets/:id
    deleteSheet:          "/cashier/sheets",              // DELETE /cashier/sheets/:id
 
    // ── Paginated entry lists ────────────────────────────────────────────────
    getOpeningEntries:    "/cashier/sheets",              // GET    /cashier/sheets/:id/opening-entries?page=&limit=
    getCollections:       "/cashier/sheets",              // GET    /cashier/sheets/:id/collections?page=&limit=
    getExpenses:          "/cashier/sheets",              // GET    /cashier/sheets/:id/expenses?page=&limit=
    getDepartmentSales:   "/cashier/sheets",              // GET    /cashier/sheets/:id/department-sales?department=HLD&page=&limit=
 
    // ── Dashboard & Summary ──────────────────────────────────────────────────
    dashboardSummary:     "/cashier/dashboard/summary",           // GET ?date=2025-01-15
    departmentSummary:    "/cashier/dashboard/departments",        // GET ?sheetId=
    sheetSummary:         "/cashier/dashboard/sheet-summary",      // GET /cashier/dashboard/sheet-summary/:id
    historySummary:       "/cashier/dashboard/history",            // GET ?start=&end=&page=&limit=
  },

  ledger: {
    // ── Accounts (Party + Banker) ──────────────────────────────────────────
    getAccounts:    "/ledger/accounts",   // GET    ?ledgerType=party&search=&status=&page=&limit=
    getAccountById: "/ledger/accounts",   // GET    /ledger/accounts/:id
    createAccount:  "/ledger/accounts",   // POST
    updateAccount:  "/ledger/accounts",   // PUT    /ledger/accounts/:id
    deleteAccount:  "/ledger/accounts",   // DELETE /ledger/accounts/:id
 
    // ── Transactions (nested under account) ───────────────────────────────
    getTransactions:    "/ledger/accounts",   // GET    /ledger/accounts/:id/transactions
    addTransaction:     "/ledger/accounts",   // POST   /ledger/accounts/:id/transactions
    updateTransaction:  "/ledger/accounts",   // PUT    /ledger/accounts/:accountId/transactions/:txnId
    deleteTransaction:  "/ledger/accounts",   // DELETE /ledger/accounts/:accountId/transactions/:txnId
 
    // ── Summary / Dashboard ────────────────────────────────────────────────
    summary: "/ledger/summary",   // GET    ?ledgerType=party
  },

};

export default API_ROUTE;

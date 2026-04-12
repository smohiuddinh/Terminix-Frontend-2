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


};

export default API_ROUTE;

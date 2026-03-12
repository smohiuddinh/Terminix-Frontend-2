const API_ROUTE = {
  user: {
    login: "/auth/signIn",
    signUp: "/auth/signUp",
    sendOtp: "/auth/sendOtp",
    submitOtp: "/auth/submitOtp",
    checkapi: "/auth/checkapi",
    changePasword: "/auth/changePasword"
  },

 cashier: {
    addSale: "/cashier/sales",
    getAllSales: "/cashier/sales",
    addExpense: "/cashier/expenses",
    getAllExpenses: "/cashier/expenses",
    deleteSale: "/cashier/sales",       // DELETE /cashier/sales/:id
    deleteExpense: "/cashier/expenses", // DELETE /cashier/expenses/:id
    dashboardSummary: "/cashier/dashboard/summary",
    departmentSummary: "/cashier/dashboard/department-summary",
    dateSummary: "/cashier/dashboard/date-summary",
    getSalesByDepartment: "/cashier/sales/department", // GET /cashier/sales/department/:departmentId
    getExpensesByDepartment: "/cashier/expenses/department", 
    updateSale:     '/cashier/sales',      // PUT /cashier/sales/:id
    updateExpense:  '/cashier/expenses',   // PUT /cashier/expenses/:id
  },


};

export default API_ROUTE;

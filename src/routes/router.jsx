import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { withSuspense } from "../../utils/withSuspense";
import AuthRoute from "../../utils/authRoute";
import AdminTemplate from "@/templates/adminTemplate";
import CashierTemplate from "@/templates/cashierTemplate";
import GmTemplate from "@/templates/gmTemplate";

import Login5 from "@/component/login/login5";
import SuperAdminDashboard from "@/pages/superadmin_dashboard/dashboard";
import International_Organization from "@/pages/superadmin_dashboard/international_organization";
import Terminix_Users from "@/pages/superadmin_dashboard/user";
import SignupAdmin from "@/pages/superadmin_dashboard/add_new_user";
import CashierDashboard from "@/component/cashier/CashierDashboard";
import GmDashboard from "@/component/gm/GmDashboard";
import PageNotFound from "@/component/pageNotFound";
import Unauthorized from "@/pages/Unauthorize";
import FumigationDashboard from "../component/fs/FumigationDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: withSuspense(<Login5 />),
  },
  {
    path: "/cashier/dashboard",
    element: withSuspense(
      <AuthRoute allowedRoles={["cashier"]}>
        <CashierDashboard />
      </AuthRoute>
    ),
  },
    {
    path: "/fs/dashboard",
    element: withSuspense(
      <AuthRoute allowedRoles={["fs"]}>
        <FumigationDashboard />
      </AuthRoute>
    ),
  },
  {
    path: "/gm/dashboard",
    element: withSuspense(
      <AuthRoute allowedRoles={["gm"]}>
        <GmDashboard />
      </AuthRoute>
    ),
  },
  {
    path: "/superadmin/dashboard",
    element: withSuspense(
      <AuthRoute allowedRoles={["admin"]}>
        <AdminTemplate isShowFooter={false}>
          <SuperAdminDashboard />
        </AdminTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/superadmin/international-organization",
    element: withSuspense(
      <AuthRoute allowedRoles={["admin"]}>
        <AdminTemplate isShowFooter={false}>
          <International_Organization />
        </AdminTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/superadmin/users",
    element: withSuspense(
      <AuthRoute allowedRoles={["admin"]}>
        <AdminTemplate isShowFooter={false}>
          <Terminix_Users />
        </AdminTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/superadmin/add-users",
    element: withSuspense(
      <AuthRoute allowedRoles={["admin"]}>
        <AdminTemplate isShowFooter={false}>
          <SignupAdmin />
        </AdminTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: withSuspense(<Unauthorized />),
  },
  {
    path: "/*",
    element: withSuspense(<PageNotFound />),
  },
]);


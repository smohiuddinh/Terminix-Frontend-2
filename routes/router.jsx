import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { lazy } from 'react';
import { withSuspense } from "../utils/withSuspense";
const SuperAdminDashboard = lazy(() => import("../src/pages/superadmin_dashboard/dashboard"));
import AuthRoute from '../utils/authRoute';
import AdminTemplate from '../src/templates/adminTemplate';
import Login1 from "../src/component/login/login1";
import Login2 from "../src/component/login/login2";
import Login3 from "../src/component/login/login3";
import Login4 from "../src/component/login/login4";
import Login5 from "../src/component/login/login5";
import ModalButton from "../src/component/modal/modal";
import International_Organization from "../src/pages/superadmin_dashboard/international_organization";
import PageNotFound from "../src/component/pageNotFound";
import Unauthorized from "../src/pages/Unauthorize";
import Iccd_Users from "../src/pages/superadmin_dashboard/user";
import CashierDashboard from '../src/component/cashier/CashierDashboard';
import SignupAdmin from "../src/pages/superadmin_dashboard/add_new_user";
import CashierTemplate from "../src/templates/cashierTemplate";
import GmTemplate from "../src/templates/gmTemplate";
import GmDashboard from '../src/component/gm/GmDashboard';

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
        <CashierTemplate isShowFooter={false}>
          <CashierDashboard />
        </CashierTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/gm/dashboard",
    element: withSuspense(
      <AuthRoute allowedRoles={["gm"]}>
        {/* <GmTemplate isShowFooter={false}> */}
          <GmDashboard />
        {/* </GmTemplate> */}
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
          <Iccd_Users />
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
    element: withSuspense(
      <Unauthorized />
    ),
  },
  {
    path: "/*",
    element: withSuspense(
      <PageNotFound />
    ),
  },
])

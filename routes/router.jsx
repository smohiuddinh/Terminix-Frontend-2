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
import Contacts from "../src/pages/superadmin_dashboard/contacts";
import International_Organization from "../src/pages/superadmin_dashboard/international_organization";
import PageNotFound from "../src/component/pageNotFound";
import Unauthorized from "../src/pages/Unauthorize";
import Iccd_Users from "../src/pages/superadmin_dashboard/user";

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
    path: "/superadmin/contacts",
    element: withSuspense(
      <AuthRoute allowedRoles={["admin"]}>
        <AdminTemplate isShowFooter={false}>
          <Contacts />
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
          <Iccd_Users />
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

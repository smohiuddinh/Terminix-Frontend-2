import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { lazy } from 'react';
import { withSuspense } from "../utils/withSuspense";
const SuperAdminDashboard = lazy(() => import("../src/pages/superadmin_dashboard/dashboard"));
import AuthRoute from '../utils/authRoute';
import AdminTemplate from '../src/templates/adminTemplate';
import LoginController from "../src/component/loginController";
import Login1 from "../src/component/login/login1";
import Login2 from "../src/component/login/login2";
import Login3 from "../src/component/login/login3";
import Login4 from "../src/component/login/login4";
import Login5 from "../src/component/login/login5";
import ModalButton from "../src/component/modal/modal";
import Contacts from "../src/pages/superadmin_dashboard/contacts";
import International_Organization from "../src/pages/superadmin_dashboard/international_organization";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  // {
  //   path: "/login",
  //   element: withSuspense(<LoginController />),
  // },
  {
    path: "/login",
    element: withSuspense(<Login5 />),
  },
  // {
  //   path: "/superadmin/dashboard",
  //   element: withSuspense(
  //     <AuthRoute>
  //     <AdminTemplate isShowFooter={false}>
  //       <SuperAdminDashboard />
  //     </AdminTemplate>
  //     </AuthRoute>
  //   ),
  // },
  {
    path: "/superadmin/contacts",
    element: withSuspense(
      <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <Contacts />
        </AdminTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/superadmin/international-organization",
    element: withSuspense(
      <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <International_Organization />
        </AdminTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/*",
    element: withSuspense(
      <div>No route found</div>
    ),
  },
  {
    path: "/test",
    element: withSuspense(
      // <AuthRoute>
      // <Login2 />
      <ModalButton />
      // </AuthRoute>
    ),
  },
])

import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { lazy } from 'react';
import SuperAdminAllOrders from '../src/component/super_admin/AdminAllOrders';
import { withSuspense } from "../utils/withSuspense";
import ActiveProjects from "../src/pages/superadmin_dashboard/manage-projects"
import UserDetailPage from "../src/pages/superadmin_dashboard/UserDetail"
const SuperAdminDashboard = lazy(() => import("../src/pages/superadmin_dashboard/dashboard"));
const ManageDispute = lazy(() => import("../src/pages/superadmin_dashboard/manage_dispute"));
const ReviewPage = lazy(() => import("../src/pages/superadmin_dashboard/review-page"));
import AuthRoute from '../utils/authRoute';
import ManageUsers from "../src/pages/superadmin_dashboard/bccd_members";
import Manage_freelancers from "../src/pages/superadmin_dashboard/manage_freelancers";
import Manage_gigs from "../src/pages/superadmin_dashboard/manage_gigs";
import AdminManageDisputes from "../src/pages/superadmin_dashboard/manage_disputes";
import DisputeDetailView from "../src/component/super_admin/DisputeDetailView";
import AdminTemplate from '../src/templates/adminTemplate';
import ActiveJobs from "../src/pages/superadmin_dashboard/manage-jobs";
import Feedbacks from "../src/pages/superadmin_dashboard/manage_feedbacks";
import Reports from "../src/pages/superadmin_dashboard/manage-reports";
import ManageContactform from "../src/pages/superadmin_dashboard/manage-contactform";
import LoginController from "../src/component/loginController";
import Login1 from "../src/component/login/login1";
import Login2 from "../src/component/login/login2";
import Login3 from "../src/component/login/login3";
import Login4 from "../src/component/login/login4";
import ModalButton from "../src/component/modal/modal";
import Contacts from "../src/pages/superadmin_dashboard/contacts";
import Poc_countries from "../src/pages/superadmin_dashboard/poc_countries";
import Bccd_members from "../src/pages/superadmin_dashboard/bccd_members";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: withSuspense(<LoginController />),
  },
  // {
  //   path: "/login",
  //   element: withSuspense(<Login2 />),
  // },
  {
    path: "/superadmin/dashboard",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <SuperAdminDashboard />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/manage-disputes",
    element: withSuspense(
      <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <AdminManageDisputes />
        </AdminTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/superadmin/admindisputedetail/:id",
    element: withSuspense(
      <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <DisputeDetailView />
        </AdminTemplate>
      </AuthRoute>
    ),
  },

  {
    path: "/superadmin/orders",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <SuperAdminAllOrders />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/manage-dispute",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <ManageDispute />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/contacts",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <Contacts />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/bccd-members",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <Bccd_members />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "superadmin/manage-contactform",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <ManageContactform />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "superadmin/manage-feedbacks",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <Feedbacks />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/manage-reports",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <Reports />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "superadmin/user/:id",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <UserDetailPage />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/Active-freelancers",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <Contacts />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/poc-country",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <Poc_countries />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "superadmin/manage-projects",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <ActiveProjects />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "/superadmin/manage-jobs",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <ActiveJobs />
      </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/reviews",
    element: withSuspense(
      // <AuthRoute>
      <AdminTemplate isShowFooter={false}>
        <ReviewPage />
      </AdminTemplate>
      // </AuthRoute>
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

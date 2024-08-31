import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./HomePage";
import DashboardLayout from "./DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import AppointmentsPage from "./pages/dashboard/AppointmentsPage";
import CertificatePage from "./pages/dashboard/CertificatePage";
import InventoryPage from "./pages/dashboard/InventoryPage";
import UsersPage from "./pages/dashboard/UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/dashboard/profile", element: <ProfilePage /> },
      { path: "/dashboard/notifications", element: <NotificationsPage /> },
      { path: "/dashboard/appointments", element: <AppointmentsPage /> },
      { path: "/dashboard/certificate", element: <CertificatePage /> },
      { path: "/dashboard/inventory", element: <InventoryPage /> },
      { path: "/dashboard/users", element: <UsersPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

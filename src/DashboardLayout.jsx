import React from "react";
import { SideBar } from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <UserProvider>
        <main className="h-screen flex">
          <SideBar />
          <section className="flex-auto p-10 max-h-screen overflow-y-auto">
            <Outlet />
          </section>
        </main>
      </UserProvider>
    </>
  );
}

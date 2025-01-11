import React from "react";
import AdminSidebar from "../../Components/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <section className="flex flex-col md:flex-row justify-between gap-2 min-h-max md:min-h-screen rounded-md ">
        <AdminSidebar />
        <div className="border min-h-max  md:min-h-full w-full p-3 overflow-x-auto">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default AdminLayout;

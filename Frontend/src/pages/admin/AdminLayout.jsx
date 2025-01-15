import React from "react";
import AdminSidebar from "../../Components/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <section className=" rounded-md">
        <AdminSidebar />
        <div className="border min-h-max  md:min-h-[550px] w-full p-3 overflow-x-auto my-5 rounded-sm">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default AdminLayout;

// flex flex-col md:flex-row justify-between gap-2 min-h-max md:min-h-screen rounded-md

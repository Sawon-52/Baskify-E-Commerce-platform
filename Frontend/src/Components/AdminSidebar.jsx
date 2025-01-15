import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Products", path: "/admin/productlist" },
    { name: "Orders", path: "/admin/orderlist" },
    { name: "Users", path: "/admin/userlist" },
    { name: "Categories", path: "/admin/Categorylist" },
  ];
  return (
    <>
      <div className=" w-full bg-slate-600 text-white min-h-max rounded-sm p-4  ">
        <h1 className="text-2xl font-bold ">Admin</h1>
        <nav className=" my-4 flex flex-col md:flex-row md:items-center gap-5">
          {links.map((link) => (
            <NavLink key={link.name} to={link.path} className={({ isActive }) => `px-4 py-2 rounded-none ${isActive ? "bg-slate-500" : "hover:bg-slate-500"}`}>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;

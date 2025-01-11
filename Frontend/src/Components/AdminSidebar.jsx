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
      <div className=" w-full md:w-52 bg-slate-700 text-white min-h-max rounded-sm">
        <h1 className="text-2xl font-bold p-4">Admin</h1>
        <nav className="mt-4 space-y-3">
          {links.map((link) => (
            <NavLink key={link.name} to={link.path} className={({ isActive }) => `block px-4 py-2 rounded-none ${isActive ? "bg-slate-600" : "hover:bg-slate-600"}`}>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;

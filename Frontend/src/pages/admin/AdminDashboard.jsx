import React from "react";
import MetricCard from "../../Components/MetricCard";

const AdminDashboard = () => {
  const metrics = [
    { icon: "👤", title: "Total Users", value: "3,456", growth: -0.95 },
    { icon: "📦", title: "Total Products", value: "2,450", growth: 2.59 },
    { icon: "🛒", title: "Total Order", value: "$45.2K", growth: 4.35 },
  ];
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

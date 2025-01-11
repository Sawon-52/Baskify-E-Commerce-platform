import React from "react";

const MetricCard = ({ icon, title, value, growth }) => {
  return (
    <div className=" p-2 rounded-md shadow-md flex flex-col items-center space-x-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-2xl">{value}</p>
        <p className={`text-sm ${growth > 0 ? "text-green-500" : "text-red-500"}`}>{growth > 0 ? `+${growth}%` : `${growth}%`}</p>
      </div>
    </div>
  );
};

export default MetricCard;

import React from "react";

const MetricCard = ({ icon, title, value }) => {
  return (
    <div className=" p-2 py-4 rounded-md shadow-md flex flex-col items-center space-x-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-2xl">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;

import React from "react";

const Loader = ({ title = "" }) => {
  return (
    <div className="flex justify-center items-center min-h-20 gap-2">
      <span className="loading loading-spinner loading-md"></span> <span className="font-semibold">{title}</span>
    </div>
  );
};

export default Loader;

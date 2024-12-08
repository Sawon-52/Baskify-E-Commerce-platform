import React from "react";
import FormComponent from "../Components/FormComponent";

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center my-28 ">
      <h2 className="text-base font-medium mb-8">
        Login to <span className=" text-xl font-semibold"> Baskify</span>
      </h2>

      <FormComponent />
    </div>
  );
};

export default LoginPage;

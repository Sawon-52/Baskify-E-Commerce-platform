import React from "react";
import FormComponent from "../Components/FormComponent";
import Meta from "../Components/Meta";

const LoginPage = () => {
  return (
    <>
      <Meta title={"Login"} />
      <div className="flex flex-col justify-center items-center my-28 ">
        <h2 className="text-base font-medium mb-8">
          Login to <span className=" text-xl font-semibold"> Baskify</span>
        </h2>

        <FormComponent />
      </div>
    </>
  );
};

export default LoginPage;

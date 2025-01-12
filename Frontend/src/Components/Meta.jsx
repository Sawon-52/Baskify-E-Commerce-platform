import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title = "Welcome to Baskify", description = "We sell the best products for cheap", keyword = "electronics, buy electronics, cheap electronics" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </Helmet>
  );
};

export default Meta;

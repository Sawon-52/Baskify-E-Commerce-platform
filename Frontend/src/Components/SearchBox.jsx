import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (location.pathname === "/admin/productlist" && userInfo.isAdmin === true) {
      navigate(`/admin/productlist/search/${keyword}`);
    } else if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="hidden md:block">
      <form className="input flex items-center gap-2 focus:outline-none focus:ring-1 focus:ring-slate-700 focus:border-transparent " onSubmit={submitHandler}>
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" placeholder="Search Products........" className="" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </form>
    </div>
  );
};

export default SearchBox;

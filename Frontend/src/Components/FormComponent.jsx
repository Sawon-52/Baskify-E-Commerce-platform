import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { setCredentials } from "../slices/authSlice";
import { loginUser } from "../slices/loginSlice";
import { toast } from "react-toastify";

const FormComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.login);
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // Redirect after login
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      dispatch(setCredentials(result)); // Save user info globally
      toast.success("Login successful!");
      navigate(redirect);
    } catch (err) {
      toast.error(err || "Login failed!");
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-primary text-white hover:bg-black" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
        {isLoading && <Loader />}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
      <div className="flex justify-center mb-4 gap-2">
        <p className="label-text-alt">New Customer?</p>
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="label-text-alt link link-hover text-blue-700">
          Register
        </Link>
      </div>
    </div>
  );
};

export default FormComponent;

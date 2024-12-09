import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../slices/registerSlice";
import { setCredentials } from "../slices/authSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isLoading } = useSelector((state) => state.register);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // Redirect after registration
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, confirmPassword);
    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    } else {
      try {
        const result = await dispatch(registerUser({ name, email, password })).unwrap();
        dispatch(setCredentials(result)); // Save user info globally
        toast.success("Register successful!");
        navigate(redirect);
      } catch (err) {
        toast.error(err || "Register failed!");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-28">
      <h2 className="text-base font-medium mb-8">
        Register to <span className=" text-xl font-semibold"> Baskify</span>
      </h2>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" placeholder="Enter name" className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input type="email" placeholder="Enter email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input type="password" placeholder="Confirm password" className="input input-bordered" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-primary text-white hover:bg-black">{isLoading ? "Register in..." : "Register"}</button>
          </div>
        </form>
        <div className="flex justify-center mb-4 gap-2">
          <p className="label-text-alt">Already Have an Account?</p>
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="label-text-alt link link-hover text-blue-700">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

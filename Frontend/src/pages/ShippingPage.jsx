import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../Components/CheckoutSteps";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div>
      <div>
        <CheckoutSteps step1 step2 />
      </div>
      <div className="flex flex-col justify-center items-center my-28">
        <h2 className="text-base font-bold mb-8">Add Delivery Address</h2>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input type="text" placeholder="Enter Address" className="input input-bordered" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input type="text" placeholder="Enter City" className="input input-bordered" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Postal Code</span>
              </label>
              <input type="text" placeholder="Enter Postal Code" className="input input-bordered" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <input type="text" placeholder="Enter country" className="input input-bordered" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-primary text-white hover:bg-black">continue</button>
            </div>
          </form>
          {/* <div className="flex justify-center mb-4 gap-2">
          <p className="label-text-alt">Already Have an Account?</p>
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="label-text-alt link link-hover text-blue-700">
            Login
          </Link>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;

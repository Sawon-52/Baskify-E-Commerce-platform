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

  const [formData, setFormData] = useState({
    firstName: shippingAddress?.firstName || "",
    lastName: shippingAddress?.lastName || "",
    phoneNumber: shippingAddress?.phoneNumber || "",
    emailAddress: shippingAddress?.emailAddress || "",
    street: shippingAddress?.street || "",
    streetNumber: shippingAddress?.streetNumber || "",
    buildingNumber: shippingAddress?.buildingNumber || "",
    city: shippingAddress?.city || "",
    zipCode: shippingAddress?.zipCode || "",
    district: shippingAddress?.district || "",
    country: shippingAddress?.country || "Bangladesh",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(saveShippingAddress({ ...formData }));
    } catch (error) {
      console.log(error);
    }
    navigate("/payment");
  };

  return (
    <>
      <div>
        <CheckoutSteps step1 step2 />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-primary">Add Delivery Address</h2>
      </div>
      <div className="card bg-base-100 w-full mx-auto p-6  rounded-md shadow-xl">
        <form onSubmit={handleSubmit}>
          {/* Delivery Contact Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-primary text-sm">Delivery Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="border border-gray-300 p-2 rounded-md w-full focus:outline-1 focus:outline-mintGreen" required />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="border border-gray-300 p-2 rounded-md w-full focus:outline-1 focus:outline-mintGreen" required />
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="border border-gray-300 p-2 rounded-md w-full focus:outline-1 focus:outline-mintGreen" required />
              <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} placeholder="Email Address" className="border border-gray-300 p-2 rounded-md w-full focus:outline-1 focus:outline-mintGreen" />
            </div>
          </div>

          {/* Delivery Address Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Street" className="border border-gray-300 p-2 rounded-md w-full focus:outline-1 focus:outline-mintGreen" required />
              <input type="text" name="streetNumber" value={formData.streetNumber} onChange={handleChange} placeholder="Street Number" className="border border-gray-300 p-2 rounded-md w-full focus:outline-1 focus:outline-mintGreen" required />
              <input type="text" name="buildingNumber" value={formData.buildingNumber} onChange={handleChange} placeholder="Building Number" className="border border-gray-300 p-2 rounded-md w-full focus:outline-1 focus:outline-mintGreen" />
              <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="border border-gray-300 p-2 rounded-md w-full focus:outline-1 focus:outline-mintGreen" required />
              <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Zip Code" className="border border-gray-300 p-2 rounded-md w-full focus:outline-1 focus:outline-mintGreen" required />
              <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="District" className="border border-gray-300 p-2 rounded-md w-full focus:outline-1 focus:outline-mintGreen" />
            </div>
            <div className="mt-4">
              <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="border border-gray-300 p-2 rounded-md w-full focus:outline-1 focus:outline-mintGreen" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button type="submit" className="btn px-4 py-2 bg-primary hover:bg-mintGreen text-white rounded-md">
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShippingPage;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../Components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("SSLCOMMERZ");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />

      <div className="max-w-3xl mx-auto px-4 py-8 border rounded-sm my-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Select Payment Method</h1>
          <p className="text-gray-600">Choose your preferred method to proceed with the payment.</p>
        </div>

        <div className="bg-white rounded-md shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-700">Payment Method</label>

              <div className="flex items-center gap-4">
                <input type="radio" id="sslcommerz" name="paymentMethod" value="SSLCOMMERZ" checked={paymentMethod === "SSLCOMMERZ"} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
                <label htmlFor="sslcommerz" className="text-gray-800">
                  SSLCOMMERZ
                </label>
              </div>
            </div>

            <div className="flex justify-center">
              <button type="submit" className=" btn btn-wide  bg-primary text-white py-3 rounded-md font-semibold hover:bg-mintGreen transition duration-300">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;

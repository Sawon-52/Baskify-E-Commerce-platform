import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../Components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

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
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div>
        <h1 className="text-xl font-bold my-2">Payment Method</h1>
        <form onSubmit={handleSubmit}>
          <h2 className="text-base font-medium">Select Method</h2>

          <div className="flex items-center gap-2 my-4">
            <input type="radio" className="radio w-5 h-5 defaultChecked" name="paymentMethod" value="Paypal" onChange={(e) => setPaymentMethod(e.target.value)} />
            <label htmlFor="">Paypal or Credit Card</label>
          </div>

          <button type="submit" className="btn bg-primary text-white hover:bg-primary">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;

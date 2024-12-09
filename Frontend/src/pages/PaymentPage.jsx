import { useState } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");  
  return <div>PaymentPage</div>;
};

export default PaymentPage;

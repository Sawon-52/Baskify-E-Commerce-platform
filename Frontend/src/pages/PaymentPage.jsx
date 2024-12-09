import { useState } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  return (
    <div>
        <CheckoutSteps step1 step2 step3 />
    </div>
  );
};

export default PaymentPage;

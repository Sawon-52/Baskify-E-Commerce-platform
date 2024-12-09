import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex gap-5 text-base font-medium">
      <nav className="">{step1 ? <Link to="/login">Sign In</Link> : <Link className="text-gray-500">Sign In </Link>}</nav>
      <nav className="">{step2 ? <Link to="/shipping">Shipping</Link> : <Link className="text-gray-500">Shipping </Link>}</nav>
      <nav className="">{step3 ? <Link to="/payment">Payment</Link> : <Link className="text-gray-500">Payment </Link>}</nav>
      <nav className="">{step4 ? <Link to="/placeorder">Place Order</Link> : <Link className="text-gray-500">Place Order </Link>}</nav>
    </div>
  );
};

export default CheckoutSteps;

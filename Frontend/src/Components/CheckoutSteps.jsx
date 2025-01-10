import { Link } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex flex-wrap gap-2 text-sm font-medium text-primary my-4 ">
      <nav className="">
        {step1 ? (
          <Link to="/login" className="flex items-center gap-1 font-semibold">
            {" "}
            <PiSignInBold />
            Sign In
            <RiArrowRightSLine className="text-xl " />
          </Link>
        ) : (
          <Link className="text-gray-400 cursor-default flex items-center gap-1">
            {" "}
            <PiSignInBold /> Sign In <RiArrowRightSLine className="text-xl " />
          </Link>
        )}
      </nav>
      <nav className="">
        {step2 ? (
          <Link to="/shipping" className="flex items-center gap-1 font-semibold">
            <FaAddressCard />
            Shipping
            <RiArrowRightSLine className="text-xl " />
          </Link>
        ) : (
          <Link className="text-gray-400 cursor-default flex items-center gap-1">
            <FaAddressCard />
            Shipping <RiArrowRightSLine className="text-xl " />
          </Link>
        )}
      </nav>
      <nav className="">
        {step3 ? (
          <Link to="/payment" className="flex items-center gap-1 font-semibold">
            <MdOutlinePayment />
            Payment
            <RiArrowRightSLine className="text-xl " />
          </Link>
        ) : (
          <Link className="text-gray-400 cursor-default flex items-center gap-1 ">
            <MdOutlinePayment />
            Payment <RiArrowRightSLine className="text-xl " />
          </Link>
        )}
      </nav>
      <nav className="">
        {step4 ? (
          <Link to="/placeorder" className="flex items-center gap-1 font-semibold">
            <BsFillCartCheckFill />
            Place Order
          </Link>
        ) : (
          <Link className="text-gray-400 cursor-default flex items-center gap-1 ">
            <BsFillCartCheckFill />
            Place Order
          </Link>
        )}
      </nav>
    </div>
  );
};

export default CheckoutSteps;

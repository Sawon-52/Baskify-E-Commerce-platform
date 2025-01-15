import { useEffect } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { createOrder } from "../slices/OrdersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { TbCurrencyTaka } from "react-icons/tb";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!cart.shippingAddress) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress, navigate]);

  const placeOrderHandle = async () => {
    try {
      const res = await dispatch(createOrder({ orderItems: cart.cartItems, shippingAddress: cart.shippingAddress, paymentMethod: cart.paymentMethod, itemsPrice: cart.itemsPrice, shippingPrice: cart.shippingPrice, taxPrice: cart.taxPrice, totalPrice: cart.totalPrice })).unwrap();
      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div>
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-5">Place Order</h2>
      </div>
      <div className="card bg-base-100 w-full mx-auto p-1 md:p-6  rounded-md shadow-xl border ">
        {/* order items  */}
        <div>
          <div>
            <h2 className="text-xl font-semibold my-2">Order Items</h2>
          </div>
          {cart.cartItems.length === 0 ? (
            <div>
              <h2 className="text-red-400 font-medium">Your Cart is empty</h2>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-primary">
                    <th>image</th>
                    <th>Title</th>
                    <th>price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img src={item.image} alt={item.name} className="h-12 w-12 rounded" />
                      </td>
                      <td className="underline cursor-pointer">
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </td>
                      <td>
                        <div className="flex items-center">
                          {item.qty} X <TbCurrencyTaka className=" hidden md:block" />
                          {item.price} = <TbCurrencyTaka className=" hidden md:block" /> {(item.qty * item.price).toFixed(2)} Tk
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* row */}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Address Payment and order summary  */}
        <div className="flex flex-col md:flex-row gap-5 justify-between  border my-5 p-3 rounded-md">
          {/* payment and Address Information */}
          <div className="w-full">
            <div>
              <h2 className="font-semibold text-xl my-2">Shipping Address</h2>
              <div className="text-base space-y-2">
                <p>
                  <span className="font-semibold">Name: </span>
                  {`${cart.shippingAddress.firstName} ${cart.shippingAddress.lastName}`}
                </p>
                <p>
                  {" "}
                  <span className="font-semibold">Phone Number: </span>
                  {`${cart.shippingAddress.phoneNumber} `}
                </p>
                <p>
                  {" "}
                  <span className="font-semibold">Email: </span>
                  {`${cart.shippingAddress.emailAddress}`}
                </p>
                <div>
                  <p>
                    <span className="font-semibold">Address: </span> {cart.shippingAddress.street}, {cart.shippingAddress.streetNumber} , {cart.shippingAddress.buildingNumber}, {cart.shippingAddress.city}, {cart.shippingAddress.district} , {cart.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>
            <hr className="my-3" />
            <div>
              <h2 className="font-semibold text-xl my-2">Payment information</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Payment Method:</span> {cart.paymentMethod}{" "}
                </p>
                <p>
                  <span className="font-semibold">Payment Date:</span> 02/01/2025
                </p>
              </div>
            </div>
          </div>

          {/* order Summary  */}
          <div className="w-full md:w-1/2 ">
            <div className="rounded-lg text-sm p-0  min-h-max">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="border-t pt-4 font-medium">
                <div className="flex justify-between mb-2">
                  <p>Subtotal</p>
                  <p className="flex items-center">
                    <TbCurrencyTaka />
                    {cart.itemsPrice} Tk
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Discount</p>
                  <p className="flex items-center">
                    <TbCurrencyTaka />
                    0.0 Tk
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Delivery</p>
                  <p className="flex items-center">
                    <TbCurrencyTaka />
                    {cart.shippingPrice} Tk
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Tax</p>
                  <p className="flex items-center">
                    <TbCurrencyTaka />
                    {cart.taxPrice} Tk
                  </p>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <p>Total</p>
                  <p className="flex items-center">
                    <TbCurrencyTaka />
                    {cart.totalPrice} Tk
                  </p>
                </div>
              </div>

              {isLoading ? (
                <Loader />
              ) : (
                <div className="flex justify-end">
                  <button className=" btn px-4 py-2 bg-primary hover:bg-mintGreen text-white rounded-md my-4" disabled={cart.cartItems.length === 0} onClick={placeOrderHandle}>
                    place Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;

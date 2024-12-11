import { useEffect } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { createOrder } from "../slices/OrdersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { isLoading, isError } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandle = async () => {
    console.log("button click");
    try {
      const res = await dispatch(createOrder({ orderItems: cart.cartItems, shippingAddress: cart.shippingAddress, paymentMethod: cart.paymentMethod, itemsPrice: cart.itemsPrice, shippingPrice: cart.shippingPrice, taxPrice: cart.taxPrice, totalPrice: cart.totalPrice })).unwrap();
      console.log(res);
      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex flex-col md:flex-row gap-5 py-6">
        <div className="w-full">
          {/* Summary Section */}
          <div>
            <h2 className="text-2xl font-bold mb-5">Shipping</h2>
            <p className="my-2">
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
            </p>
          </div>
          <hr />
          <div className="my-2">
            <h2 className="font-bold text-base my-1">Payment Method</h2>
            <strong className="text-sm font-medium">Method: </strong>
            <span className="text-sm">{cart.paymentMethod}</span>
          </div>
          <hr />
          <div>
            <div>
              <h2 className="text-xl font-bold my-2">Order Items</h2>
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
                          {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    {/* row */}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/3 ">
          <div className="rounded-lg text-sm shadow-lg p-5 min-h-max">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border-t pt-4 font-medium">
              <div className="flex justify-between mb-2">
                <p>Subtotal</p>
                <p>${cart.itemsPrice}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Discount</p>
                <p>-$0.0</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Delivery</p>
                <p>${cart.shippingPrice}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Tax</p>
                <p>+${cart.taxPrice}</p>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <p>Total</p>
                <p>${cart.totalPrice}</p>
              </div>
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <button className=" btn w-full mt-4 py-2 bg-primary text-white rounded-lg hover:bg-primary" disabled={cart.cartItems.length === 0} onClick={placeOrderHandle}>
                place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;

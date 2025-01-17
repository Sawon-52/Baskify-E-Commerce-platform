import { Link, useParams, useSearchParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { deliverOrder, getOrderDetails } from "../slices/OrdersApiSlice";
import { paymentCreate } from "../slices/paymentApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { TbCurrencyTaka } from "react-icons/tb";

const OrderPage = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.auth);
  const { paymentInfo } = useSelector((state) => state.payment);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (orderId) {
      try {
        dispatch(getOrderDetails(orderId));
      } catch (error) {
        toast.error("Failed to fetch order details.");
      }
    } else {
      toast.error("Invalid order ID.");
    }

    if (searchParams.size > 0) {
      const success = searchParams.get("success");
      const message = searchParams.get("message");

      if (success === "true") {
        toast.success(message || "Payment successful!");
      } else if (success === "false") {
        toast.error(message || "Payment failed. Please try again.");
      }
    }
  }, [dispatch, orderId, searchParams]);

  const handleToDeliver = async () => {
    try {
      dispatch(deliverOrder(orderId));
      toast.success("Order delivered");
    } catch (error) {
      toast.error(error.message || error.error);
    }
  };

  const handleToPaid = async () => {
    dispatch(paymentCreate(orderId));
    if (paymentInfo.url) {
      window.location.replace(paymentInfo.url);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="font-medium">
            <span className="text-xl font-bold">Order Id:</span> {orders._id}
          </h1>

          <div className="flex flex-col md:flex-row gap-5 py-6 md:p-5 shadow-xl rounded-md">
            <div className="w-full p-1 md:p-3">
              {/* Orders items  */}
              <div>
                <div>
                  <h2 className="text-xl font-semibold my-2">Order Items</h2>
                </div>

                {orders.orderItems?.length === 0 ? (
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
                          <th>No.Items</th>
                          <th>price</th>
                          <th>Total price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.orderItems?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <img src={item.image} alt={item.name} className="h-12 w-12 rounded" />
                            </td>
                            <td className="underline cursor-pointer">
                              <Link to={`/product/${item._id}`}>{item.name}</Link>
                            </td>
                            <td>{item.qty}</td>
                            <td>{`${item.price} Tk`}</td>
                            <td>
                              <p>{`${(item.qty * item.price).toFixed(2)}Tk`}</p>
                            </td>
                          </tr>
                        ))}
                        {/* row */}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* shipping address */}
              <div className="flex flex-col md:flex-row justify-between gap-3 my-5 border p-3 rounded-md">
                <div className="w-full">
                  <h2 className="font-semibold text-xl my-2">Shipping Address</h2>
                  <div className="text-base space-y-2">
                    <p>
                      <span className="font-semibold">Name: </span>
                      {`${orders.shippingAddress?.firstName} ${orders.shippingAddress?.lastName}`}
                    </p>
                    <p>
                      {" "}
                      <span className="font-semibold">Phone Number: </span>
                      {`${orders.shippingAddress?.phoneNumber} `}
                    </p>
                    <p>
                      {" "}
                      <span className="font-semibold">Email: </span>
                      {`${orders.shippingAddress?.emailAddress}`}
                    </p>
                    <div>
                      <p>
                        <span className="font-semibold">Address: </span> {orders.shippingAddress?.street}, {orders.shippingAddress?.streetNumber} , {orders.shippingAddress?.buildingNumber}, {orders.shippingAddress?.city}, {orders.shippingAddress?.district} , {orders.shippingAddress?.country}
                      </p>
                    </div>
                    {orders?.isDelivered ? (
                      <div role="alert" className="alert alert-success bg-green-200 my-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Delivered on {orders.deliveredAt}</span>
                      </div>
                    ) : (
                      <div role="alert" className="alert alert-error my-2 bg-red-200 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Not Delivered</span>
                      </div>
                    )}
                  </div>

                  <hr className="my-5" />
                  <div className="my-2">
                    <h2 className="font-bold text-base my-1">Payment Method</h2>
                    <strong className="text-sm font-semibold">Method: </strong>
                    <span className="text-sm">{orders.paymentMethod}</span>
                    {orders.isPaid ? (
                      <div role="alert" className="alert alert-success bg-green-200 my-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Paid</span>
                      </div>
                    ) : (
                      <div role="alert" className="alert alert-error bg-red-200 my-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Not Paid</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* order summary  */}
                <div className="w-full md:w-1/2 ">
                  <div className="rounded-lg text-sm  p-5 min-h-max">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="border-t pt-4 font-medium">
                      <div className="flex justify-between mb-2">
                        <p>Subtotal</p>
                        <p className="flex items-center">
                          <TbCurrencyTaka />
                          {orders.itemsPrice} Tk
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
                          {orders.shippingPrice} Tk
                        </p>
                      </div>
                      <div className="flex justify-between mb-2">
                        <p>Tax</p>
                        <p className="flex items-center">
                          <TbCurrencyTaka />
                          {orders.taxPrice} Tk
                        </p>
                      </div>
                      <div className="flex justify-between font-semibold text-lg">
                        <p>Total</p>
                        <p className="flex items-center">
                          <TbCurrencyTaka />
                          {orders.totalPrice} Tk
                        </p>
                      </div>
                    </div>
                    {!userInfo.isAdmin && !orders.isPaid && (
                      <div className="flex justify-end">
                        <button className=" btn  mt-10 py-2 bg-primary text-white rounded-lg hover:bg-primary" onClick={handleToPaid}>
                          Please Pay First
                        </button>
                      </div>
                    )}
                    {userInfo.isAdmin && !orders.isDelivered && (
                      <div className="flex justify-end">
                        <button className=" btn  mt-10 py-2 bg-primary text-white rounded-lg hover:bg-primary" onClick={handleToDeliver}>
                          Mark As Delivered
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderPage;

import { Link, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { deliverOrder, getOrderDetails } from "../slices/OrdersApiSlice";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getOrderDetails(orderId)).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [orderId]);

  const handleToDeliver = async () => {
    try {
      await dispatch(deliverOrder(orderId)).unwrap();
      refetch();
      toast.success("Order delivered");
    } catch (error) {
      toast.error(error.message || error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="font-medium">
            <span className="font-bold">Order Id:</span> {orders._id}
          </h1>
          <div className="flex flex-col md:flex-row gap-5 py-6">
            <div className="w-full">
              {/* Summary Section */}
              <div className="my-2 space-y-2">
                <h2 className="text-2xl font-bold mb-5">Shipping</h2>
                <p>
                  <strong>Name: </strong>
                  {orders.user?.name}{" "}
                </p>
                <p>
                  <strong>Email: </strong>
                  {orders.user?.email}{" "}
                </p>
                <p>
                  <strong>Phone: </strong>
                  {orders.shippingAddress?.phoneNumber}{" "}
                </p>
                <p className="">
                  <strong>Address: </strong>
                  {orders.shippingAddress?.address}, {orders.shippingAddress?.postalCode},{orders.shippingAddress?.country}
                </p>

                {orders?.isDelivered ? (
                  <div role="alert" className="alert alert-success bg-green-200 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Delivered on {orders.deliveredAt}</span>
                  </div>
                ) : (
                  <div role="alert" className="alert alert-error my-2 bg-red-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Not Delivered</span>
                  </div>
                )}
              </div>

              <hr />
              <div className="my-2">
                <h2 className="font-bold text-base my-1">Payment Method</h2>
                <strong className="text-sm font-semibold">Method: </strong>
                <span className="text-sm">{orders.paymentMethod}</span>
                {orders.isPaid ? (
                  <div role="alert" className="alert alert-success bg-green-200 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Paid</span>
                  </div>
                ) : (
                  <div role="alert" className="alert alert-error bg-red-200 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Not Paid</span>
                  </div>
                )}
              </div>
              <hr />
              <div>
                <div>
                  <h2 className="text-xl font-bold my-2">Order Items</h2>
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
                          <th>price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.orderItems?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <img src={item.image} alt={item.name} className="h-12 w-12 rounded" />
                            </td>
                            <td className="text-primary">{item.name}</td>
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
                    <p>${orders.itemsPrice}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Discount</p>
                    <p>-$0.0</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Delivery</p>
                    <p>${orders.shippingPrice}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Tax</p>
                    <p>+${orders.taxPrice}</p>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <p>Total</p>
                    <p>${orders.totalPrice}</p>
                  </div>
                </div>
                {!userInfo.isAdmin && !orders.isPaid && <button className=" btn w-full mt-4 py-2 bg-primary text-white rounded-lg hover:bg-primary">Please Paid first</button>}
                {userInfo.isAdmin && !orders.isDelivered && (
                  <button className=" btn w-full mt-4 py-2 bg-primary text-white rounded-lg hover:bg-primary" onClick={handleToDeliver}>
                    Mark As Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderPage;

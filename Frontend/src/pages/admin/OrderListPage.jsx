import React, { useEffect } from "react";
import { getOrders } from "../../slices/OrdersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const OrderListPage = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, isError } = useSelector((state) => state.orders);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getOrders()).unwrap();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className=" w-full my-8 md:my-0">
        <h2 className="text-base font-semibold mb-4">All Orders</h2>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <p>{isError?.data.message || isError.error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr className="text-primary font-medium">
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id} className="text-base font-medium">
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.taxPrice}</td>
                    <td>{order.isPaid ? order.paidAt?.substring(0, 10) : <RxCross2 className="text-red-500 " />}</td>
                    <td>{order.isDelivered ? order.deliveredAt?.substring(0, 10) : <RxCross2 className="text-red-500 " />}</td>
                    <td className="underline text-primary font-medium">
                      <Link to={`/orders/${order._id}`}>Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderListPage;

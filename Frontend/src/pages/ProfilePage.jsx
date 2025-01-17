import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UpdateProfile } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { logoutUser } from "../slices/usersApiSlice";
import { removeCredentials } from "../slices/authSlice";
import { getMyOrders } from "../slices/OrdersApiSlice";
import Loader from "../Components/Loader";
import { RxCross2 } from "react-icons/rx";
import Meta from "../Components/Meta";
import { TbCurrencyTaka } from "react-icons/tb";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading: updatingLoading } = useSelector((state) => state.users);
  const { myOrders, isLoading, isError } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("PassWord do not match");
    } else {
      try {
        const res = await dispatch(UpdateProfile({ _id: userInfo._id, name, email, password })).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile Updated Successfully");
      } catch (error) {
        toast.error(error?.message || error.error);
      }
    }
  };

  const logoutHandler = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(removeCredentials());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Meta title={userInfo.name} />
      <h1 className="text-2xl font-bold mb-5 text-center md:text-start">
        Welcome to <span>{userInfo.name}</span>
      </h1>
      <section className=" shadow-xl border p-4 rounded-sm">
        <div className="flex flex-col items-center md:flex-row md:items-start justify-between gap-5">
          <div className=" max-w-xs w-full border p-3 rounded-md">
            <h2 className="text-base font-semibold mb-4">My Profile</h2>
            <div className="card bg-base-100  shrink-0  ">
              <form className="card-body p-0" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" placeholder="Enter name" className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input type="email" placeholder="Enter email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input type="password" placeholder="Confirm password" className="input input-bordered" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="form-control mt-6">
                  <button className="btn bg-primary text-white hover:bg-mintGreen">{updatingLoading ? "Updating..." : "Update"}</button>
                </div>
              </form>
            </div>
          </div>

          {/* My order table  */}
          <div className=" w-full my-8 md:my-0 border p-4 rounded-md">
            <h2 className="text-base font-semibold mb-4">My Orders</h2>
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
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {myOrders?.map((order) => (
                      <tr key={order._id} className="text-base font-medium">
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td className="flex items-center flex-nowrap">
                          <TbCurrencyTaka className="hidden md:block " />
                          {order.taxPrice} Tk
                        </td>
                        <td>{order.isPaid ? order.paidAt?.substring(0, 10) : <RxCross2 className="text-red-500 " />}</td>
                        <td>{order.isDelivered ? order.deliveredAt?.substring(0, 10) : <RxCross2 className="text-red-500 " />}</td>
                        <td className="underline text-primary font-medium ">
                          <Link to={`/orders/${order._id}`}>Details</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end" onClick={logoutHandler}>
          <button className="btn bg-primary text-base text-white font-medium hover:bg-mintGreen">Logout</button>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;

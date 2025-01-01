import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, clearProductInfo, updateProduct, uploadProductImage } from "../../slices/productsApiSlice";
import { getUser, updateUser } from "../../slices/usersApiSlice";
import Loader from "../../Components/Loader";
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";

const UserEditPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleUser: user, isLoading } = useSelector((state) => state.users);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId,
      name,
      email,
      isAdmin,
    };
    const result = await dispatch(updateUser(updatedUser)).unwrap();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product Updated");
      navigate("/admin/userlist");
    }
  };

  return (
    <>
      <NavLink to={"/admin/userlist"}>
        <div className="flex items-center text-base gap-1 mb-4">
          <IoIosArrowRoundBack />
          <p className="text-sm font-bold">Go Back</p>
        </div>
      </NavLink>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col max-w-sm ">
          <h2 className="text-xl font-bold ">Edit User</h2>
          <div className="card w-full max-w-xl">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label font-medium">
                  <span className="label-text"> Name</span>
                </label>
                <input type="text" placeholder="Enter User Name" className="input input-bordered input-sm" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-control">
                <label className="label font-medium">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Enter User Email" className="input input-bordered input-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex gap-1 my-2">
                <input type="checkbox" className="my-1" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                <label className="label font-medium">
                  <span className="label-text">Is Admin</span>
                </label>
              </div>

              <div className="form-control mt-6">
                <button className="btn  bg-primary text-white hover:bg-black">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserEditPage;

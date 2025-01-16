import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../slices/usersApiSlice";
import Loader from "../../Components/Loader";
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
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, userId, user]);

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
      toast.success("User Updated");
      navigate("/admin/userlist");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="text-xl font-bold ">Edit User</h2>
          <div className="flex justify-center ">
            <div className="card w-full max-w-md  p-3 rounded-md">
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
        </div>
      )}
    </>
  );
};

export default UserEditPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../slices/usersApiSlice";
import Loader from "../../Components/Loader";
import { IoCreate } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const UserListPage = () => {
  const { users, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUsers()).unwrap();
    };
    fetchUser();
  }, []);

  const handleUserDelete = async (id) => {
    if (window.confirm("Are you Sure?")) {
      try {
        const res = await dispatch(deleteUser(id)).unwrap();
        toast.success(res.message);
        await dispatch(getUsers()).unwrap();
      } catch (error) {
        toast.error(error?.message || error.error);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold">Users</h1>
      </div>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="table px-0">
              {/* head */}
              <thead>
                <tr className="text-primary">
                  <th>ID</th>
                  <th>NAME</th>
                  <th>Email</th>
                  <th>IS ADMIN</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {users?.map((user, index) => (
                  <tr key={index} className="font-medium">
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}> {user.email}</a>
                    </td>
                    <td>{user.isAdmin ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-400" />}</td>
                    <td className="flex text-xl cursor-pointer h-full gap-2">
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <IoCreate className="text-green-400" />
                      </Link>

                      <Link>
                        <MdDelete className="text-red-400" onClick={() => handleUserDelete(user._id)} />
                      </Link>
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

export default UserListPage;

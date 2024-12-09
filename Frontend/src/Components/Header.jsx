import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../assets/profile.png";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  // const [isLogin, setIsLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewCart = () => {
    navigate("/cart");
    setShowModal(false);
  };

  const logoutHandler = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
      <div className="navbar p-0 bg-[#ffff]">
        <div className="flex-1 ">
          <Link to={"/"} className="text-xl font-bold text-primary cursor-pointer">
            <span className="text-2xl text-mintGreen">B</span>askify
          </Link>
        </div>
        <div className="flex-none  gap-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-third  btn-circle" onClick={() => setShowModal(true)}>
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && <span className="badge badge-sm indicator-item">{cartItems.reduce((a, c) => a + c.qty, 0)}</span>}
              </div>
            </div>
            {showModal && (
              <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                <div className="card-body">
                  <span className="text-lg font-bold">{cartItems.reduce((a, c) => a + c.qty, 0)} Items</span>
                  <span className="text-mintGreen">Subtotal: {totalPrice ? totalPrice : 0}</span>
                  <div className="card-actions">
                    <button className="btn bg-orangePeel btn-block hover:bg-mintGreen" onClick={handleViewCart}>
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {userInfo ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="profilePic" src={profilePic} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link className="justify-between">{userInfo.name}</Link>
                </li>
                <li>
                  <Link>Settings</Link>
                </li>
                <li onClick={logoutHandler}>
                  <Link>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className="btn-sm bg-primary text-white rounded-full text-xs px-3 hover:bg-mintGreen duration-200 font-semibold">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

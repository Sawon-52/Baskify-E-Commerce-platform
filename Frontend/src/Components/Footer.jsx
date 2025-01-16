import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { PiPhoneCallThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Footer = () => {
  const { categories } = useSelector((state) => state.category);

  const handleSubscribe = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="w-full bg-slate-800 text-white">
        <footer className="footer justify-between px-4 md:px-6 py-10  md:py-20 max-w-screen-lg mx-auto">
          <nav className="space-y-1">
            {/* <h6 className="footer-title">Services</h6> */}
            <div className="flex-1">
              <Link className="text-4xl font-bold">
                <span className="text-5xl text-mintGreen">B</span>askify
              </Link>
            </div>
            <Link className="link link-hover flex items-center gap-2">
              <CiLocationOn />
              <p>Mirpur 10, Dhaka, Bangladesh</p>
            </Link>
            <Link className="link link-hover flex items-center gap-2">
              <CiMail />
              <p>Baskify@gmail.com </p>
            </Link>
            <Link className="link link-hover flex gap-2 items-center">
              <PiPhoneCallThin />
              <p>+880 1714727995</p>
            </Link>
            <div className="flex items-center gap-3 text-base  font-bold">
              <div>
                <p className="">Follow Us</p>
              </div>
              <div className="flex gap-3 my-2">
                <Link>
                  <FaFacebook />
                </Link>
                <Link>
                  <FaInstagramSquare />
                </Link>
                <Link>
                  <FaXTwitter />
                </Link>
              </div>
            </div>
          </nav>
          <nav className=" space-y-1">
            <h6 className="mb-[0.5rem] font-bold uppercase ">Categories</h6>
            {categories?.map((category) => (
              <Link key={category._id} to={`/category/${category.name}`} className="link link-hover">
                {category?.name}
              </Link>
            ))}
          </nav>
          <nav className=" space-y-1">
            <h6 className="mb-[0.5rem] font-bold uppercase ">Legal</h6>
            <Link className="link link-hover">Terms of use</Link>
            <Link className="link link-hover">Privacy policy</Link>
            <Link className="link link-hover">Cookie policy</Link>
          </nav>
          <form className="text-white">
            <h6 className="mb-[0.5rem] font-bold uppercase ">Newsletter</h6>
            <fieldset className="max-w-80">
              <label className="label">
                <span className="label-text text-white">Subscribe to our newsletter and get 10% off your first purchase</span>
              </label>
              <div className="relative max-w-sm">
                <input type="text" placeholder="username@site.com" className=" py-4 pl-1 md:pl-5 pr-[125px] md:pr-[120px] border border-primary rounded-full outline-none  " />
                <button className="btn rounded-full  bg-primary hover:bg-[#27A599] text-white absolute right-3 top-[3px]" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </div>
            </fieldset>
          </form>
        </footer>

        <div className="flex justify-center bg-slate-700">
          <footer className="  ">
            <div className="footer py-8  max-w-screen-lg  mx-auto px-4 md:px-6 ">
              <aside className="grid-flow-col items-center text-md">
                <p> &copy; {new Date().getFullYear()} - All right reserved by Baskify</p>
              </aside>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;

import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { PiPhoneCallThin } from "react-icons/pi";
import { SlSocialFacebook } from "react-icons/sl";
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="w-full bg-third py-20">
        <footer className="footer w-full lg:w-[80%] mx-auto px-6 lg:px-40">
          <nav className=" space-y-1">
            {/* <h6 className="footer-title">Services</h6> */}
            <div className="flex-1">
              <a className="text-xl font-bold text-primary">
                <span className="text-2xl text-mintGreen">B</span>askify
              </a>
            </div>
            <a className="link link-hover flex items-center gap-2">
              <CiLocationOn className="text-primary text-base " />
              <p>Mirpur 10, Dhaka, Bangladesh</p>
            </a>
            <a className="link link-hover flex items-center gap-2">
              <CiMail />
              <p>Baskify@gmail.com </p>
            </a>
            <a className="link link-hover flex gap-2 items-center">
              <PiPhoneCallThin />
              <p>+880 1714727995</p>
            </a>
          </nav>
          <nav className=" space-y-1">
            <h6 className="mb-[0.5rem] font-bold uppercase text-primary">Categories</h6>
            <a className="link link-hover">Men</a>
            <a className="link link-hover">Woman</a>
            <a className="link link-hover">Accessories</a>
            <a className="link link-hover">Shoes</a>
          </nav>
          <nav className=" space-y-1">
            <h6 className="mb-[0.5rem] font-bold uppercase text-primary">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
          <form>
            <h6 className="mb-[0.5rem] font-bold uppercase text-primary">Newsletter</h6>
            <fieldset className="max-w-80">
              <label className="label">
                <span className="label-text">Subscribe to our newsletter and get 10% off your first purchase</span>
              </label>
              <div className="relative">
                <input type="text" placeholder="username@site.com" className=" py-4 pl-5 pr-[120px] border border-primary rounded-full outline-none  " />
                <button className="btn rounded-full  bg-primary hover:bg-[#27A599] text-white absolute right-3 top-[3px]">Subscribe</button>
              </div>
            </fieldset>
          </form>
        </footer>
      </div>

      <footer className="footer items-center p-4 py-10 w-full lg:w-[80%] mx-auto px-6 lg:px-40">
        <aside className="grid-flow-col items-center">
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Baskify</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end place-content-center cursor-pointer">
          <a>
            <SlSocialFacebook className="text-xl font-bold text-secondary" />
          </a>
          <a>
            <CiInstagram className="text-xl font-bold text-secondary" />
          </a>
          <a>
            <FaXTwitter className="text-xl font-bold text-secondary" />
          </a>
        </nav>
      </footer>
    </>
  );
};

export default Footer;

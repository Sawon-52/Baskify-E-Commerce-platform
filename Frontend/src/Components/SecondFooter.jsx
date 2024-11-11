import React from "react";
import { SlSocialFacebook } from "react-icons/sl";
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SecondFooter = () => {
  return (
    <footer className="footer py-8 max-w-screen-lg mx-auto px-4 md:px-6">
      <aside className="grid-flow-col items-center text-xs">
        <p> &copy; {new Date().getFullYear()} - All right reserved by Baskify</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end place-content-center cursor-pointer">
        <Link>
          <SlSocialFacebook className="text-base font-bold text-secondary" />
        </Link>
        <Link>
          <CiInstagram className="text-base font-bold text-secondary" />
        </Link>
        <Link>
          <FaXTwitter className="text-base font-bold text-secondary" />
        </Link>
      </nav>
    </footer>
  );
};

export default SecondFooter;

import React from "react";


const SecondFooter = () => {
  return (
    <footer className="footer py-8 max-w-screen-lg mx-auto px-4 md:px-6">
      <aside className="grid-flow-col items-center text-xs">
        <p> &copy; {new Date().getFullYear()} - All right reserved by Baskify</p>
      </aside>
      
    </footer>
  );
};

export default SecondFooter;

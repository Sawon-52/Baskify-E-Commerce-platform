import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <div className="font-Montserrat">
        <header className=" sticky top-0 z-10">
          {/* discount header it is top of the page  */}
          <div className="w-full min-h-10 py-2 bg-[#222222] text-base flex justify-center text-white ">
            <p className="text-[12px]">
              Summer sale discount off 50%! <span className="text-red-500 ">Shop Now</span>
            </p>
          </div>

          {/* Navber  */}
          <nav className="max-w-screen-lg mx-auto px-4 md:px-6 bg-[#ffff]">
            <Header />
            <div>
              <hr className="h-1" />
            </div>
          </nav>
        </header>

        <main className="max-w-screen-lg mx-auto px-4 md:px-6 my-5 min-h-max">
          <Outlet />
        </main>

        <footer className="">
          <Footer />
        </footer>

        <ToastContainer />
      </div>
    </>
  );
};

export default App;

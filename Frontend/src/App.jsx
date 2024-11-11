import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import SecondFooter from "./Components/SecondFooter";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div className="font-Montserrat">
      <header>
        {/* discount header it is top of the page  */}
        <div className="w-full min-h-10 py-2 bg-[#222222] text-base flex justify-center text-white ">
          <p className="text-[12px]">
            Summer sale discount off 50%! <span className="text-red-500 ">Shop Now</span>
          </p>
        </div>

        {/* Navber  */}
        <nav className="max-w-screen-lg mx-auto px-4 md:px-0">
          <Header />
          <div>
            <hr className="h-1" />
          </div>
        </nav>
      </header>

      <main className="max-w-screen-lg mx-auto min-h-screen px-4 md:px-0 my-6">
        <Outlet />
      </main>

      <footer>
        <div className="w-full bg-third ">
          <Footer />
        </div>

        <div>
          <SecondFooter />
        </div>
      </footer>
    </div>
  );
};

export default App;

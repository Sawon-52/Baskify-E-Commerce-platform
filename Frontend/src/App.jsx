import Footer from "./Components/Footer";
import Header from "./Components/Header";

const App = () => {
  return (
    <div className="font-Montserrat">
      <div className="w-full min-h-10 py-2 bg-[#222222] text-base flex justify-center text-white ">
        <p className="text-[12px]">
          Summer sale discount off 50%! <span className="text-red-500 ">Shop Now</span>
        </p>
      </div>
      <div className="">
        <div className="w-full lg:w-[80%] mx-auto px-6 lg:px-40">
          <header>
            <Header />
          </header>
          <div>
            <hr className="h-1" />
          </div>
          <main>
            <h2 className="text-xl font-semibold">Welcome to Baskify! Enhance Your shoping experience</h2>
          </main>
        </div>

        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
};

export default App;

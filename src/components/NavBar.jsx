import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomNumeralNumericFormat from "./Price";
import { selectAll } from "../slices/cartSlice";
import { BsFillCartCheckFill, BsSun, BsMoon } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  // const { cartItems } = useSelector((state) => state.cart);
  const cart = useSelector(selectAll);

  //Dark Mode Config
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button
          onClick={() => setTheme("light")}
          className="bg-gray-200 rounded-lg  text-base md:text-lg  lg:text-xl dark:bg-gray-600 p-2"
        >
          <BsSun  />
        </button>
      );
    } else {
      return (
        <button
          onClick={() => setTheme("dark")}
          className="bg-gray-200 rounded-lg text-base md:text-lg  lg:text-xl p-2 text-black"
        >
          <BsMoon  />
        </button>
      );
    }
  };

  return (
    <header className="border-b border-palette-lighter dark:bg-gray-200 sticky  top-0 z-20 bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-20 px-6  ">
        <Link to="/" className="cursor-pointer">
          <h1 className="flex no-underline">
            <span className="md:text-xl dark:text-gray-700  font-bold tracking-tight text-base pt-1">
              فروشگاه استیکر
            </span>
          </h1>
        </Link>
        <div>
          <Link to="/cart" className="relative">
         
            <div className="flex  gap-6 items-center ">
              {/* Dark Mode */}
              <div>{renderThemeChanger()}</div>

              {/* Cart */}
              <div className="relative">
                <BsFillCartCheckFill className="dark:text-gray-800 text-base md:text-lg  lg:text-xl"  />
                <span className="absolute -top-3 -right-3  w-5 h-5 text-xs flex items-center justify-center  bg-red-400 rounded-md">
                  <CustomNumeralNumericFormat
                    value={cart.length}
                    thousandSeparator=","
                  />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

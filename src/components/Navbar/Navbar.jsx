import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  let { count, userToken, setUserToken } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <header className="fixed bg-gray-300 inset-x-0 top-0 z-50 capitalize">
        <nav
          className="flex items-center justify-between p-6 py-3 lg:px-8"
          aria-label="Global"
        >
          <div className="flex me-4 ">
            <NavLink to="home" href="" className="">
              <span className="sr-only">Fresh Cart </span>
              <img className="h-8 w-auto" src={logo} alt="fresh-cart" />
            </NavLink>
          </div>
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="-m-2.5 inline-flex items-center bg-gray-200 hover:bg-gray-400 justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {userToken && (
            <div className="hidden lg:flex lg:gap-x-3">
              <NavLink
                to={"home"}
                className="text-sm/6 font-semibold text-gray-500"
              >
                home
              </NavLink>
              <NavLink
                to={"cart"}
                className="text-sm/6 font-semibold text-gray-500"
              >
                Cart
              </NavLink>
              <NavLink
                to={"categories"}
                className="text-sm/6 font-semibold text-gray-500"
              >
                categories
              </NavLink>
              <NavLink
                to={"brands"}
                className="text-sm/6 font-semibold text-gray-500"
              >
                brands
              </NavLink>
              <NavLink
                to={"products"}
                className="text-sm/6 font-semibold text-gray-500"
              >
                products
              </NavLink>
              <NavLink
                to={"wishlist"}
                className="text-sm/6 font-semibold text-gray-500"
              >
                wish list
              </NavLink>
            </div>
          )}

          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
            {userToken ? (
              <>
                <NavLink
                  to={"cart"}
                  className="text-sm/6 font-semibold text-gray-500"
                >
                  <i className="fas fa-shopping-cart"></i> {cart.numOfCartItems}{" "}
                </NavLink>
                
                <span
                  onClick={() => logOut()}
                  className="text-sm/6 font-semibold text-gray-500"
                >
                  Logout{" "}
                </span>{" "}
                :
              </>
            ) : (
              <>
                <NavLink to={"Register"} className="text-sm/6 text-gray-600">
                  register{" "}
                </NavLink>
                <NavLink to={"login"} className="text-sm/6 text-gray-600">
                  Login <span aria-hidden="true">→</span>
                </NavLink>
              </>
            )}
          </div>
        </nav>

        
        <div
          className={isOpen ? "lg:hidden" : "hidden"}
          role="dialog"
          aria-modal="true"
        >
        
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink to={""} className="-m-1.5 p-1.5">
                <img className="h-8 w-auto" src={logo} alt="fresh-cart" />
              </NavLink>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 bg-white hover:bg-light "
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <NavLink
                    to={"home"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    home
                  </NavLink>
                  <NavLink
                    to={"cart"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Cart
                  </NavLink>
                  <NavLink
                    to={"categories"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    categories
                  </NavLink>
                  <NavLink
                    to={"brands"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    brands
                  </NavLink>
                  <NavLink
                    to={"products"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    products
                  </NavLink>
                  <NavLink
                    to={"wishlist"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    wishlist
                  </NavLink>
                </div>
                <div className="py-6">
                  <NavLink
                    to={""}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to={"login"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    login
                  </NavLink>
                  <span className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    logout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

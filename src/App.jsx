import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Login from "./components/Login/Login.jsx";
import Brands from "./components/Brands/Brands.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Categories from "./components/Catrgories/Categories.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Notfound from "./components/Notfound/Notfound.jsx";
import Products from "./components/Products/Products.jsx";
import Register from "./components/Register/Register.jsx";
import Footer from "./components/Footer/Footer.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/CheckOut/CheckOut";
import Wishlist from "./components/WishList/WishList.jsx";
import WishListContextProvider from "./context/WishListContext";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: localStorage.getItem("userToken") ? (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ) : (
          <Navigate to="/login" />
        ),
      },
      {
        path: "login",
        element: localStorage.getItem("userToken") ? (
          <Navigate to="/home" />
        ) : (
          <Login />
        ),
      },
      {
        path: "register",
        element: localStorage.getItem("userToken") ? (
          <Navigate to="/home" />
        ) : (
          <Register />
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      { path: "navbar", element: <Navbar /> },
      { path: "*", element: <Notfound /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      { path: "Footer", element: <Footer /> },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "CheckOut",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "WishList",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <CartContextProvider>
        <UserContextProvider>
          <WishListContextProvider>
            <RouterProvider router={routers}></RouterProvider>
            <Toaster />
          </WishListContextProvider>
        </UserContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;

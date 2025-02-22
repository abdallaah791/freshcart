import React from "react";
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export const WishListContext = createContext();
export default function WishListContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  WishListContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  async function addToWishlist(productId) {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token } }
      );
      setWishlist(data.data);
      toast.success("Added to wishlist successfully! ❤️");
      return true;
    } catch (error) {
      toast.error("Failed to add to wishlist");
      return false;
    }
  }

  async function removeFromWishlist(productId) {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      );
      setWishlist(data.data);
      toast.success("Removed from wishlist");
      return true;
    } catch (error) {
      toast.error("Failed to remove from wishlist");
      return false;
    }
  }

  async function getWishlist() {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token } }
      );
      setWishlist(data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishListContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, getWishlist }}
    >
      {children}
    </WishListContext.Provider>
  );
}

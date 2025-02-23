import React, { useState, useEffect } from "react";
import axios from "axios";
import Products from "../Products/Products";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import toast from "react-hot-toast";

export default function Home() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token },
      });
      setWishlist(data.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to fetch wishlist");
    }
  }

  async function toggleWishlist(productId) {
    try {
      const token = localStorage.getItem("userToken");
      const isInWishlist = wishlist.some((item) => item._id === productId);
      
      if (isInWishlist) {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
          headers: { token },
        });
        setWishlist((prev) => prev.filter((item) => item._id !== productId));
        toast.success("Item removed from wishlist");
      } else {
        await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId }, {
          headers: { token },
        });
        fetchWishlist();
        toast.success("Item added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  }

  return (
    <>
      <MainSlider />
      <CategorySlider />
      
      {/* تمرير بيانات الـ Wishlist لكل منتج */}
      <Products wishlist={wishlist} toggleWishlist={toggleWishlist} />
    </>
  );
}

import React, { useState, useContext, useEffect } from "react";
import { Heart, Trash, Search } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

const WishList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(null);
  const { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token } }
      );
      setWishlist(data.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to fetch wishlist items");
    } finally {
      setLoading(false);
    }
  }

  async function removeFromWishlist(productId) {
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      );
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item from wishlist");
    }
  }

  async function handleAddToCart(productId) {
    setLoadingProduct(productId);
    await addProductToCart(productId);
    toast.success("Added to cart successfully");
    setLoadingProduct(null);
  }

  const filteredItems = wishlist.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-2 justify-center">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search wishlist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md w-1/2"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading wishlist...</p>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.imageCover}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">
                  {item.description?.slice(0, 100)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">
                    {item.price} EGP
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item._id)}
                      disabled={loadingProduct === item._id}
                      className={`px-4 py-2 rounded ${
                        loadingProduct === item._id
                          ? "bg-gray-400"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white transition-colors`}
                    >
                      {loadingProduct === item._id
                        ? "Adding..."
                        : "Add to Cart"}
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Heart className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500">
            Start adding some items to your wishlist!
          </p>
        </div>
      )}
    </div>
  );
};

export default WishList;

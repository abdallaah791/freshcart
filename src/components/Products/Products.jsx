import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartContext";
import { WishListContext } from "../../context/WishListContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistLoading, setWishlistLoading] = useState(null);

  let { addProductToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishListContext);

  async function getProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
    setFilteredProducts(data.data);
    setLoading(false);
  }

  async function handleAddToCart(productId) {
    setLoadingProduct(productId);
    await addProductToCart(productId);
    toast.success("تمت إضافة المنتج إلى السلة بنجاح 🛒");
    setLoadingProduct(null);
  }

  async function handleWishlist(productId) {
    setWishlistLoading(productId);
    const isInWishlist = wishlist.some((item) => item._id === productId);

    if (isInWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
    setWishlistLoading(null);
  }

  useEffect(() => {
    getProducts();
  }, []);

  function handleSearch(event) {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredProducts(
      products.filter((product) => product.title.toLowerCase().includes(term))
    );
  }

  return (
    <>
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
          All Products
        </h2>

        {/* ✅✅ مستطيل البحث ✅✅ */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-2/3 md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap py-8 gap-y-4 justify-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="w-1/6">
                <div className="products p-2 rounded-lg relative group p-4 bg-white transition-all cursor-pointer hover:text-white hover:shadow-lg hover:scale-105">
                  <button
                    onClick={() => handleWishlist(product.id)}
                    disabled={wishlistLoading === product.id}
                    className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-red-50"
                  >
                    <i
                      className={`fas fa-heart ${
                        wishlist.some((item) => item._id === product.id)
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    ></i>
                  </button>
                  <Link to={`/productdetails/${product.id}`}>
                    <img
                      src={product.imageCover}
                      className="w-full object-top object-cover"
                      alt={product.title}
                    />
                    <h3 className="text-main">{product.category.name}</h3>
                    <h3 className="text-xl">
                      {product.title.split(" ", 2).join(" ")}
                    </h3>
                    <div className="flex justify-between">
                      <span className="pt-5">{product.price} EGP</span>
                      <span>
                        {" "}
                        <i className=" pt-5 fas fa-star"></i>{" "}
                        {product.ratingsAverage}{" "}
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={loadingProduct === product.id}
                    className={`w-full p-4 border rounded-lg shadow-sm transition-all cursor-pointer ${
                      loadingProduct === product.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-white hover:bg-green-500 hover:text-white hover:shadow-lg"
                    } opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 duration-300`}
                  >
                    {loadingProduct === product.id
                      ? "جاري الإضافة..."
                      : "Add To Cart"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No products found.
            </p>
          )}
        </div>
      )}
    </>
  );
}

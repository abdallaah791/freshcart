import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Loading from '../Loading/Loading';
import { WishlistContext } from '../../context/WishlistContext';
import toast from "react-hot-toast";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [filteredWishlist, setFilteredWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  let { getWishlist, removeProductFromWishlist } = useContext(WishlistContext);

  async function fetchWishlist() {
    const data = await getWishlist();
    setWishlist(data);
    setFilteredWishlist(data);
    setLoading(false);
  }

  async function handleRemoveFromWishlist(productId) {
    await removeProductFromWishlist(productId);
    toast.success("تمت إزالة المنتج من قائمة الأمنيات ❌");
    fetchWishlist();
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    const filtered = wishlist.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWishlist(filtered);
  }, [searchTerm, wishlist]);

  return (
    <>
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Wishlist</h2>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search in wishlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-2/3 p-3 border rounded-lg shadow-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {loading ? <Loading /> :
        <div className="flex flex-wrap py-8 gap-y-4 justify-center">
          {filteredWishlist.length > 0 ? filteredWishlist.map((product) => (
            <div key={product.id} className="w-1/6">
              <div className="products p-2 rounded-lg relative group p-4 bg-white transition-all cursor-pointer 
                           hover:text-white hover:shadow-lg hover:scale-105">
                <Link to={`/productdetails/${product.id}`}>
                  <img src={product.imageCover} className="w-full" alt={product.title} />
                  <h3 className="text-main">{product.category.name}</h3>
                  <h3 className="text-xl">{product.title.split(' ', 2).join(' ')}</h3>
                  <div className="flex justify-between">
                    <span className='pt-5'>{product.price} EGP</span>
                    <span> <i className=" pt-5 fas fa-star"></i> {product.ratingsAverage} </span>
                  </div>
                </Link>
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="w-full p-4 mt-2 border rounded-lg shadow-sm bg-red-500 text-white hover:bg-red-600 hover:shadow-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          )) : <p className="text-center text-gray-500">Your wishlist is empty.</p>}
        </div>
      }
    </>
  );
}

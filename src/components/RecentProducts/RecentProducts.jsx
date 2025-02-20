import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Loading from '../Loading/Loading';
import { CartContext } from '../../context/CartContext';
import toast from "react-hot-toast";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  let { addProductToCart } = useContext(CartContext);

  async function getProducts() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
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

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <>
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-center  text-green-600 mb-8">All Products</h2>
        <div className="  flex justify-center mb-6">
          <input 
            type=" text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" w-300  text-center w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {loading ? <Loading /> :
        <div className="flex flex-wrap py-8 gap-y-4 justify-center">
          {filteredProducts.map((product) => (
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
                  onClick={() => handleAddToCart(product.id)}
                  disabled={loadingProduct === product.id}
                  className={`w-full p-4 border rounded-lg shadow-sm transition-all cursor-pointer 
                             ${loadingProduct === product.id ? 'bg-gray-400 cursor-not-allowed' : 'bg-white hover:bg-green-500 hover:text-white hover:shadow-lg'}
                             opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 duration-300`}
                >
                  {loadingProduct === product.id ? "جاري الإضافة..." : "Add To Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
}

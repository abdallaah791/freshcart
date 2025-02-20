import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Loading from "../Loading/Loading";
import axios from "axios";

export default function Cart() {
  let { cart, getProductsCart, handleDeleteProduct } = useContext(CartContext);
  const navigate = useNavigate(); // ⬅️ لإعادة التوجيه بين الصفحات

  async function updateProductCount(productId, newCount) {
    if (newCount < 1) return;

    try {
      const token = localStorage.getItem("userToken");
      const headers = { token };

      await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      );

      getProductsCart(); // تحديث بيانات السلة بعد التعديل
    } catch (error) {
      console.error("Error updating product count:", error);
    }
  }

  return (
    <>
      {cart && cart.data ? (
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.data.products.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={item.product.imageCover}
                        className="  w-16 md:w-32 max-w-full max-h-full"
                        alt={item.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          disabled={item.count === 0}
                          onClick={() =>
                            updateProductCount(item.product._id, item.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          {/* علامة الناقص يا ناقص */}
                          <span className="text-lg font-bold">-</span>
                        </button>
                        <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg px-2.5 py-1">
                          {item.count}
                        </span>
                        <button
                          onClick={() =>
                            updateProductCount(item.product._id, item.count + 1)
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          {/*  علامة الزائد يا ناقص برضوا */}
                          <span className="text-lg font-bold">+</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.price * item.count} LE
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteProduct(item.product._id)} // هنا احنا غيرنا الـ id بـ _id
                        className="font-medium bg-transparent hover:bg-transparent text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ زر الـ Checkout */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

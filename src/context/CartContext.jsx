import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  async function addProductToCart(productId, count) {
    try {
      const token = localStorage.getItem("userToken");
      const headers = { token };

      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId, count },
        { headers }
      );

      setCart(data); //
      toast.success("تمت إضافة لمنتج إلى السلة ✅");
      getProductsCart();
    } catch (err) {
      console.error("Error adding product to cart:", err);
      toast.error("حدث خطأ أثناء إضافة المنتج إلى السلة ❌");
    }
  }

  async function handleDeleteProduct(productId) {
    try {
      const token = localStorage.getItem("userToken");
      const headers = { token };

      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );

      setCart(data);
      toast.success("تم حذف المنتج من السلة بنجاح ✅");
      getProductsCart();
    } catch (err) {
      console.error("Error deleting product from cart:", err);
      toast.error("حدث خطأ أثناء حذف المنتج من السلة ❌");
    }
  }

  async function updateProductCount(productId, count) {
    if (count < 1) return;

    try {
      const token = localStorage.getItem("userToken");
      const headers = { token };

      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId, count },
        { headers }
      );

      setCart(data);
      toast.success("تم تعديل الكمية بنجاح ✅");
      getProductsCart();
    } catch (err) {
      console.error("Error updating product count:", err);
      toast.error("حدث خطأ أثناء تحديث الكمية ❌");
    }
  }

  async function getProductsCart() {
    try {
      const token = localStorage.getItem("userToken");
      const headers = { token };

      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
      );

      setCart(data); // تحديث حالة السلة
    } catch (err) {
      console.error("Error fetching cart items:", err);
      toast.error("حدث خطأ أثناء جلب عناصر السلة ❌");
    }
  }

  useEffect(() => {
    getProductsCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getProductsCart,
        cart,
        updateProductCount,
        handleDeleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

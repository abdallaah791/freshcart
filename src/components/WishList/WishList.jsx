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
      const headers = { token };
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers });
      setWishlist(data.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("حدث خطأ أثناء جلب عناصر قائمة الأمنيات ❌");
    } finally {
      setLoading(false);
    }
  }

  async function removeFromWishlist(productId) {
    try {
      const token = localStorage.getItem("userToken");
      const headers = { token };
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });

      // تحديث القائمة بدون إعادة التحميل
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== productId));

      toast.success("تم حذف المنتج من قائمة الأمنيات ✅");
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      toast.error("حدث خطأ أثناء حذف المنتج من قائمة الأمنيات ❌");
    }
  }

  async function handleAddToCart(productId) {
    setLoadingProduct(productId);
    await addProductToCart(productId);
    toast.success("تمت إضافة المنتج إلى السلة بنجاح 🛒");
    setLoadingProduct(null);
  }

  const filteredItems = wishlist.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* 🔍 شريط البحث */}
      <div className="mb-4 flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search your wishlist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
      </div>

      {/* 🔄 تحميل البيانات */}
      {loading ? (
        <p className="text-center text-gray-500">Loading wishlist...</p>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Card key={item._id} className="rounded-2xl shadow-md">
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">{item.price} EGP</span>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(item._id)}
                      disabled={loadingProduct === item._id}
                      variant="outline"
                      className={`flex items-center gap-2 ${loadingProduct === item._id ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                    >
                      {loadingProduct === item._id ? "جاري الإضافة..." : "Add to Cart"}
                    </Button>
                    <Button 
                      onClick={() => removeFromWishlist(item._id)} 
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Trash className="w-5 h-5 text-red-500" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
          <Heart className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">قائمة الأمنيات فارغة</h2>
          <p className="text-gray-500">ابدأ بإضافة المنتجات المفضلة لديك هنا.</p>
        </div>
      )}
    </div>
  );
};

export default WishList;

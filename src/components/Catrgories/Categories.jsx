import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subcategories, setSubcategories] = useState([]); // ✅ تخزين الفئات الفرعية

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        if (response.data && response.data.data) {
          setCategories(response.data.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // ✅ فتح المودال وجلب الفئات الفرعية عند النقر
  async function openModal(category) {
    setSelectedCategory(category);
    setIsModalOpen(true);

    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${category._id}/subcategories`
      );
      if (response.data && response.data.data) {
        setSubcategories(response.data.data);
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubcategories([]);
    }
  }

  // ✅ إغلاق المودال
  function closeModal() {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setSubcategories([]); // إعادة تعيين الفئات الفرعية عند إغلاق المودال
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
        All Categories
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading categories...</p>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => openModal(category)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-24 object-contain"
              />
              <p className="text-center font-semibold mt-2">{category.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No categories available.</p>
      )}

      {/* ✅ ✅ المودال ✅ ✅ */}
      {isModalOpen && selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-3 text-gray-500 text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-green-600 text-xl font-bold mb-4">
              {selectedCategory.name}
            </h2>
            <img
              src={selectedCategory.image}
              alt={selectedCategory.name}
              className="w-full h-32 object-contain mb-3"
            />
            <p className="text-gray-600 text-sm text-center">
              {selectedCategory.slug}
            </p>

            {/* ✅ ✅ عرض الفئات الفرعية ✅ ✅ */}
            {subcategories.length > 0 && (
              <div className="mt-6">
                <h3 className="text-green-600 text-lg font-semibold text-center mb-2">
                  {selectedCategory.name} Subcategories
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {subcategories.map((sub) => (
                    <div
                      key={sub._id}
                      className="border rounded-lg p-2 text-center text-gray-700 hover:bg-green-100 transition cursor-pointer"
                    >
                      {sub.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/brands`
        );
        if (response.data && response.data.data) {
          setBrands(response.data.data);
        } else {
          setBrands([]);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  function openModal(brand) {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedBrand(null);
  }

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
        All Brands
      </h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading brands...</p>
      ) : filteredBrands.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredBrands.map((brand) => (
            <div
              key={brand._id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => openModal(brand)}
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-24 object-contain"
              />
              <p className="text-center font-semibold mt-2">{brand.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No brands available.</p>
      )}

      {isModalOpen && selectedBrand && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-3 text-gray-500 text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-green-600 text-xl font-bold mb-4">
              {selectedBrand.name}
            </h2>
            <img
              src={selectedBrand.image}
              alt={selectedBrand.name}
              className="w-full h-32 object-contain mb-3"
            />
            <p className="text-gray-600 text-sm text-center">
              {selectedBrand.slug}
            </p>
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

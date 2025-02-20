import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  function handlePayment() {
    alert(`Processing payment for:\nDetails: ${details}\nPhone: ${phone}\nCity: ${city}`);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
          Checkout
        </h2>

        <input
          type="text"
          placeholder="Details"
          className="w-full border p-2 rounded-md mb-3"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full border p-2 rounded-md mb-3"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          className="w-full border p-2 rounded-md mb-3"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
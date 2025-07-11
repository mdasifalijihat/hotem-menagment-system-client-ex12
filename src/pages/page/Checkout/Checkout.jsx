import React from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const CheckoutPage = () => {
  const { package_name } = useParams();
  const { user } = useAuth();

  // Example pricing (optional)
  const pricing = {
    Silver: 9.99,
    Gold: 19.99,
    Platinum: 29.99,
  };

  const handleCheckout = () => {
    // For now, just show alert
    alert(`You selected ${package_name} package`);
    // You can later integrate payment API here
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Checkout - {package_name} Package
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={user?.displayName || ""}
            readOnly
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={user?.email || ""}
            readOnly
          />
        </div>

        <div>
          <label className="block font-semibold">Selected Package</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={package_name}
            readOnly
          />
        </div>

        <div>
          <label className="block font-semibold">Total Price</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={`$${pricing[package_name] || "N/A"}`}
            readOnly
          />
        </div>

        <button
          className="btn btn-primary w-full mt-6"
          onClick={handleCheckout}
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;

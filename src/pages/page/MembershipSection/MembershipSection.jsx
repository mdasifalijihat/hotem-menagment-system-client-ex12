import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

const MembershipSection = () => {
  const navigate = useNavigate();

  const packages = [
    {
      name: "Basic",
      price: 9.99,
      color: "bg-blue-500",
      btnColor: "bg-blue-500 hover:bg-blue-600",
      features: [
        { text: "Basic Meal Access", included: true },
        { text: "Email Support", included: true },
        { text: "Limited Offers", included: false },
        { text: "Priority Meals", included: false },
        { text: "24/7 Support", included: false },
      ],
    },
    {
      name: "Standard",
      price: 19.99,
      color: "bg-orange-500",
      btnColor: "bg-orange-500 hover:bg-orange-600",
      features: [
        { text: "Priority Meal Access", included: true },
        { text: "Email & Chat Support", included: true },
        { text: "Exclusive Offers", included: true },
        { text: "Fast Processing", included: false },
        { text: "24/7 Support", included: false },
      ],
    },
    {
      name: "Premium",
      price: 29.99,
      color: "bg-red-500",
      btnColor: "bg-red-500 hover:bg-red-600",
      features: [
        { text: "All Meal Access", included: true },
        { text: "24/7 Support", included: true },
        { text: "Exclusive Offers", included: true },
        { text: "Fastest Processing", included: true },
        { text: "Premium Benefits", included: true },
      ],
    },
  ];

  const handleSelect = (name) => {
    navigate(`/checkout/${name}`);
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Choose Your Membership
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
            onClick={() => handleSelect(pkg.name)}
          >
            {/* Header */}
            <div className={`${pkg.color} text-white text-center py-6`}>
              <h3 className="text-2xl font-bold">{pkg.name}</h3>
            </div>

            {/* Price */}
            <div className="text-center py-6">
              <p className="text-4xl font-extrabold text-gray-800">
                ${pkg.price}
              </p>
              <span className="text-gray-500">/month</span>
            </div>

            {/* Features */}
            <ul className="px-8 space-y-3">
              {pkg.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-gray-700"
                >
                  {feature.included ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <div className="px-8 py-6">
              <button                
                className={`w-full py-3 text-white font-semibold rounded-lg transition ${pkg.btnColor}`}
              >
                Upgrade Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipSection;


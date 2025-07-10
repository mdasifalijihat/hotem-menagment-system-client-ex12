import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../api/useAxiosSecure";

const MembershipSection = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const packages = [
    {
      name: "Silver",
      price: 9.99,
      color: "bg-slate-100",
      benefits: ["Basic Meal Access", "Support via Email", "Standard Speed"],
    },
    {
      name: "Gold",
      price: 19.99,
      color: "bg-yellow-100",
      benefits: [
        "Priority Meal Access",
        "Chat & Email Support",
        "Fast Processing",
      ],
    },
    {
      name: "Platinum",
      price: 29.99,
      color: "bg-purple-100",
      benefits: [
        "All Meals Access",
        "24/7 Support",
        "Fastest Processing",
        "Exclusive Offers",
      ],
    },
  ];

  const handleSelect = (name) => {
    navigate(`/checkout/${name}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Choose a Membership</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`card ${pkg.color} shadow-xl transition hover:scale-105 cursor-pointer`}
            onClick={() => handleSelect(pkg.name)}
          >
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold">{pkg.name} Package</h3>
              <p className="text-xl text-gray-700 font-semibold mb-4">
                ${pkg.price} / month
              </p>
              <ul className="text-sm text-left mb-4 space-y-2">
                {pkg.benefits.map((b, idx) => (
                  <li key={idx}>✅ {b}</li>
                ))}
              </ul>
              <button className="btn btn-primary w-full">Upgrade Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipSection;

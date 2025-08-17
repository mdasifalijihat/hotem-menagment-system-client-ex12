import React from "react";
import CountUp from "react-countup";
import { FaUtensils, FaUserGraduate, FaStar, FaHeart } from "react-icons/fa";

const stats = [
  { id: 1, end: 1250, label: "Meals Served", icon: <FaUtensils />, color: "text-green-500" },
  { id: 2, end: 300, label: "Students Registered", icon: <FaUserGraduate />, color: "text-blue-500" },
  { id: 3, end: 850, label: "Reviews Posted", icon: <FaStar />, color: "text-yellow-500" },
  { id: 4, end: 4200, label: "Likes Given", icon: <FaHeart />, color: "text-red-500" },
];

const StatsCounter = () => {
  return (
    <section className="my-12 ">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Achievements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition"
          >
            {/* Icon */}
            <div className={`text-4xl mb-3 ${stat.color}`}>{stat.icon}</div>

            {/* Number Counter */}
            <h3 className="text-3xl font-bold text-gray-800">
              <CountUp end={stat.end} duration={3} separator="," />
              +
            </h3>

            {/* Label */}
            <p className="text-gray-500 mt-2 text-sm font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaCalendarAlt, FaUserCheck } from "react-icons/fa";

const AboutPage = () => {
  const navigate = useNavigate(); // React Router hook

  return (
    <div className="container mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">About HostelMate</h1>
        <p className="text-gray-700 text-lg">
          Simplifying hostel life with easy access to meals, memberships, events, and updates.
        </p>
      </div>

      {/* Who We Are */}
      <div className="bg-yellow-50 p-6 rounded-2xl shadow-md space-y-3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Who We Are</h2>
        <p className="text-gray-700">
          HostelMate is a platform designed to simplify hostel life by providing
          information about meals, memberships, upcoming events, and more. Our mission is
          to keep hostel residents informed and connected.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition text-center space-y-3">
          <FaUtensils className="text-3xl text-blue-500 mx-auto" />
          <h3 className="text-xl font-semibold">Upcoming Meals</h3>
          <p className="text-gray-600 text-sm">
            See the upcoming meals and plan your day accordingly. Never miss a delicious menu!
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition text-center space-y-3">
          <FaCalendarAlt className="text-3xl text-green-500 mx-auto" />
          <h3 className="text-xl font-semibold">Events & Announcements</h3>
          <p className="text-gray-600 text-sm">
            Stay informed about hostel events, notices, and other important updates.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition text-center space-y-3">
          <FaUserCheck className="text-3xl text-purple-500 mx-auto" />
          <h3 className="text-xl font-semibold">Membership</h3>
          <p className="text-gray-600 text-sm">
            Manage your membership, access premium features, and enjoy exclusive meal options.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 p-6 rounded-2xl shadow-md text-center space-y-3">
        <h2 className="text-2xl font-semibold text-gray-800">Get Started Today!</h2>
        <p className="text-gray-700">
          Join HostelMate and explore upcoming meals, manage your membership, and stay updated.
        </p>
        <div className="flex justify-center mt-4 gap-4">
          {/* Navigate to /meals */}
          <button
            onClick={() => navigate("/meals")}
            className="px-6 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            View Meals
          </button>

          {/* Navigate to /membershipSection */}
          <button
            onClick={() => navigate("/membershipSection")}
            className="px-6 py-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition"
          >
            Membership
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

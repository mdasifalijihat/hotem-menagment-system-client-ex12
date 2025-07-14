import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../api/useAxiosSecure";
import {
  FaUtensils,
  FaUsers,
  FaShoppingCart,
  FaComments,
  FaCalendarAlt,
  FaClipboardList,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGooglePlusG,
} from "react-icons/fa";

const AdminInformation = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    meals: 0,
    users: 0,
    payments: 0,
    reviews: 0,
    upcomingMeals: 0,
    mealRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        // Using a single endpoint would be better, but we'll handle multiple
        const endpoints = [
          "/meals/count",
          "/users/count",
          "/payments/count",
          "/reviews/count",
          "/upcoming-meals/count",
          "/meal-requests/count",
        ];

        const responses = await Promise.allSettled(
          endpoints.map(endpoint => axiosSecure.get(endpoint))
        );

        const statsData = responses.map(res => 
          res.status === "fulfilled" ? res.value.data : { count: 0 }
        );

        setStats({
          meals: statsData[0].count || 0,
          users: statsData[1].count || 0,
          payments: statsData[2].count || 0,
          reviews: statsData[3].count || 0,
          upcomingMeals: statsData[4].count || 0,
          mealRequests: statsData[5].count || 0,
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
        setError("Failed to load dashboard data. Please try again later.");
        // Set default values
        setStats({
          meals: 0,
          users: 0,
          payments: 0,
          reviews: 0,
          upcomingMeals: 0,
          mealRequests: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard Overview</h2>

        {error && (
          <div className="alert alert-error mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<FaUtensils />} color="green" title="Total Meals" value={stats.meals} />
          <StatCard icon={<FaUsers />} color="blue" title="Total Users" value={stats.users} />
          <StatCard icon={<FaShoppingCart />} color="purple" title="Payments Made" value={stats.payments} />
          <StatCard icon={<FaComments />} color="pink" title="Total Reviews" value={stats.reviews} />
          <StatCard icon={<FaCalendarAlt />} color="orange" title="Upcoming Meals" value={stats.upcomingMeals} />
          <StatCard icon={<FaClipboardList />} color="red" title="Meal Requests" value={stats.mealRequests} />
        </div>

        <h3 className="text-xl font-semibold mb-4">Social Media Insights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SocialCard color="bg-blue-700" icon={<FaFacebookF />} title="Friends" count="35K" sub="128 Feeds" />
          <SocialCard color="bg-blue-400" icon={<FaTwitter />} title="Followers" count="584K" sub="978 Tweets" />
          <SocialCard color="bg-blue-800" icon={<FaLinkedinIn />} title="Contacts" count="758+" sub="365 Feeds" />
          <SocialCard color="bg-red-600" icon={<FaGooglePlusG />} title="Followers" count="450" sub="57 Circles" />
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, color, title, value }) => {
  const colorClasses = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  };

  return (
    <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
      <div className="card-body items-center text-center p-6">
        <div className={`w-16 h-16 ${colorClasses[color]} rounded-full flex items-center justify-center mb-3 text-white text-3xl`}>
          {icon}
        </div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <h3 className="text-md text-gray-500">{title}</h3>
      </div>
    </div>
  );
};

// Reusable Social Card Component
const SocialCard = ({ color, icon, title, count, sub }) => (
  <div className={`card ${color} text-white shadow-md hover:shadow-lg transition-shadow`}>
    <div className="card-body items-center p-6">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm opacity-80">{title}</p>
      <p className="text-sm opacity-80 mt-1">{sub}</p>
    </div>
  </div>
);

export default AdminInformation;
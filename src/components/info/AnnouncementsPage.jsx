import React, { useState, useEffect } from "react";
import { FaGift, FaUserCircle } from "react-icons/fa";

const AnnouncementsPage = () => {
  // Default/dummy data
  const defaultAnnouncements = [
    { _id: 1, title: "Welcome Offer!", message: "Get 20% off for first-time members.", userName: "Alice" },
    { _id: 2, title: "Free Dinner", message: "Premium members get a free dinner this weekend.", userName: "Bob" },
    { _id: 3, title: "Event Reminder", message: "Don't miss the hostel cultural night!", userName: "Charlie" },
    { _id: 4, title: "Maintenance Notice", message: "Water supply will be off tomorrow from 10 AM.", userName: "Admin" },
    { _id: 5, title: "New Meal Menu", message: "Check out our delicious new lunch menu!", userName: "Admin" },
  ];

  const [announcements, setAnnouncements] = useState([]);

  
  useEffect(() => {
    // Use default data for now
    setAnnouncements(defaultAnnouncements);
  }, []);

  const latestAnnouncements = announcements.slice(0, 3);
  const oldAnnouncements = announcements.slice(3);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-primary mb-4">Announcements</h1>

      {/* Marquee Section */}
      {latestAnnouncements.length > 0 && (
        <div className="bg-yellow-50 p-3 rounded-xl shadow-inner overflow-hidden">
          <div className="whitespace-nowrap animate-marquee">
            {latestAnnouncements.map((a) => (
              <span key={a._id} className="inline-block mr-10 font-medium text-gray-800 flex items-center gap-2">
                <FaGift className="text-red-500" />
                {a.title} <FaUserCircle title={a.userName} />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Old Announcements */}
      {oldAnnouncements.length > 0 ? (
        <ul className="space-y-4">
          {oldAnnouncements.map((a) => (
            <li key={a._id} className="border p-4 rounded-lg shadow hover:shadow-md transition flex flex-col gap-2">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                {a.title} <FaUserCircle className="text-blue-500" title={a.userName} />
              </h2>
              <p className="text-gray-700">{a.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No other announcements at this moment.</p>
      )}

      {/* Marquee Animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-block;
            animation: marquee 15s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default AnnouncementsPage;

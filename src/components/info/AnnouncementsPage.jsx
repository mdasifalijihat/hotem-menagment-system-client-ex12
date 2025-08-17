import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../api/useAxiosSecure";
import { Link } from "react-router-dom";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/notifications?type=announcement").then((res) => {
      setAnnouncements(res.data || []);
    });
  }, [axiosSecure]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-4">Announcements</h1>
      {announcements.length > 0 ? (
        <ul className="space-y-4">
          {announcements.map((a) => (
            <li
              key={a._id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="font-semibold text-lg">{a.title}</h2>
              <p className="text-gray-700">{a.message}</p>
              {a.link && (
                <Link
                  to={a.link}
                  className="text-primary underline mt-2 inline-block"
                >
                  Learn More
                </Link>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No announcements at this moment.</p>
      )}
    </div>
  );
};

export default AnnouncementsPage;

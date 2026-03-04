import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function YourComplaints() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchComplaints = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/requests/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setComplaints(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComplaints();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white px-8 py-20">
      <h1 className="text-4xl font-bold mb-12">
        Your <span className="text-green-400">Complaints</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-zinc-900 border border-zinc-800 hover:border-green-400 p-6 rounded-2xl transition"
          >
            <p className="text-sm text-gray-400 mb-2">
              Complaint ID
            </p>

            <h3 className="text-lg font-semibold text-green-400">
              {complaint.trackingId}
            </h3>

            <p className="mt-4 text-gray-400 text-sm">
              {complaint.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourComplaints;
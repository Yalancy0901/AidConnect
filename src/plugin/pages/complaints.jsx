import React, { useEffect, useState } from "react";
import axios from "axios";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/requests"
        );
        setComplaints(res.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 border-b border-green-400 pb-2">
        All Complaints
      </h1>

      {loading ? (
        <p className="text-green-400">Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p className="text-zinc-400">No complaints found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-zinc-700">
            <thead>
              <tr className="bg-zinc-900 text-green-400">
                <th className="p-3 border border-zinc-700 text-left">
                  Tracking ID
                </th>
                <th className="p-3 border border-zinc-700 text-left">
                  Description
                </th>
                <th className="p-3 border border-zinc-700 text-left">
                  Location
                </th>
                <th className="p-3 border border-zinc-700 text-left">
                  Status
                </th>
                <th className="p-3 border border-zinc-700 text-left">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-zinc-800 transition"
                >
                  <td className="p-3 border border-zinc-700">
                    {item.trackingId}
                  </td>

                  <td className="p-3 border border-zinc-700">
                    {item.description}
                  </td>

                  <td className="p-3 border border-zinc-700">
                    {item.location}
                  </td>

                  <td className="p-3 border border-zinc-700">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "Unassigned"
                          ? "bg-yellow-400 text-black"
                          : item.status === "In Progress"
                          ? "bg-blue-400 text-black"
                          : item.status === "Resolved"
                          ? "bg-green-400 text-black"
                          : "bg-red-400 text-black"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3 border border-zinc-700">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Complaints;
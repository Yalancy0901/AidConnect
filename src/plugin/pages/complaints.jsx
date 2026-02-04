import React from "react";

const complaints = [
  {
    id: "CMP-001",
    title: "Water supply issue",
    category: "Water",
    status: "Pending",
    date: "2026-01-28",
  },
  {
    id: "CMP-002",
    title: "Streetlight not working",
    category: "Electricity",
    status: "In Progress",
    date: "2026-01-27",
  },
  {
    id: "CMP-003",
    title: "Garbage not collected",
    category: "Sanitation",
    status: "Resolved",
    date: "2026-01-25",
  },
];

function getStatusColor(status) {
  if (status === "Resolved") return "text-green-400";
  if (status === "In Progress") return "text-yellow-400";
  return "text-red-400";
}

export default function Complaints() {
  return (
    <div className="p-6 md:p-10 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Complaints</h1>
        <p className="text-gray-400 mt-2">
          Manage, track, and resolve incoming complaints.
        </p>
      </div>

      <div className="overflow-x-auto bg-zinc-900 rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800 text-gray-300">
            <tr>
              <th className="px-6 py-4 text-left">Complaint ID</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((item) => (
              <tr
                key={item.id}
                className="border-t border-zinc-800 hover:bg-zinc-800 transition"
              >
                <td className="px-6 py-4 font-medium">{item.id}</td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className={`px-6 py-4 font-semibold ${getStatusColor(item.status)}`}>
                  {item.status}
                </td>
                <td className="px-6 py-4 text-gray-400">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

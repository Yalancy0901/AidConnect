import React from "react";

const complaints = [
  {
    id: "CMP-101",
    title: "Water is not available in our Area",
    village: "Kasipatti",
    status: "Unassigned",
    date: "2026-02-21",
  },
  {
    id: "CMP-102",
    title: "No proper hospital supplies in the clinic",
    village: "Jolarpet",
    status: "Unassigned",
    date: "2026-02-25",
  },
  {
    id: "CMP-103",
    title: "No proper road to main city",
    village: "Lokkipet",
    status: "To Do",
    date: "2026-02-27",
  },
  {
    id: "CMP-104",
    title: "Broken toilet and less number of working toilets",
    village: "Komapatti",
    status: "In Progress",
    date: "2026-03-06",
  },
  {
    id: "CMP-105",
    title: "Need of proper education",
    village: "Misouri",
    status: "In Progress",
    date: "2026-02-18",
  },
  {
    id: "CMP-106",
    title: "No availability of seed crops in the market",
    village: "Kolhapur",
    status: "Blocked",
    date: "2026-02-21",
  },
  {
    id: "CMP-107",
    title: "School roof broken",
    village: "Ammapettai",
    status: "Resolved",
    date: "2026-03-06",
  },
];

function getStatusColor(status) {
  switch (status) {
    case "Resolved":
      return "text-green-400";
    case "In Progress":
      return "text-yellow-400";
    case "Blocked":
      return "text-orange-400";
    case "To Do":
      return "text-blue-400";
    case "Unassigned":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

export default function Complaints() {
  return (
    <div className="p-6 md:p-10 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Complaints</h1>
        <p className="text-gray-400 mt-2">
          View and manage complaints across all stages.
        </p>
      </div>

      <div className="overflow-x-auto bg-zinc-900 rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800 text-gray-300">
            <tr>
              <th className="px-6 py-4 text-left">Complaint ID</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Village</th>
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
                <td className="px-6 py-4">{item.village}</td>
                <td
                  className={`px-6 py-4 font-semibold ${getStatusColor(
                    item.status
                  )}`}
                >
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

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Analytics() {
  const [stats, setStats] = useState([
  { label: "Total Complaints", value: 0 },
  { label: "Resolved", value: 0 },
  { label: "In Progress", value: 0 },
  { label: "Pending", value: 0 }
]);

const [demandData, setDemandData] = useState([
  { category: "Water and Sanitation", count: 0 },
  { category: "Healthcare and Medical Support", count: 0 },
  { category: "Education", count: 0 },
  { category: "Infrastructure and Public Utilities", count: 0 },
  { category: "Livelihood and Financial Support", count: 0 },
  { category: "Others", count: 0 }
]);

useEffect(() => {
  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests");

      const complaints = res.data;

      const total = complaints.length;
      const resolved = complaints.filter(c => c.status === "resolved").length;
      const inProgress = complaints.filter(c => c.status === "inProgress").length;
      const pending = complaints.filter(c => c.status === "unassigned").length;

      setStats([
        { label: "Total Complaints", value: total },
        { label: "Resolved", value: resolved },
        { label: "In Progress", value: inProgress },
        { label: "Pending", value: pending }
      ]);

      const categories = {
        "Water and Sanitation": 0,
        "Healthcare and Medical Support": 0,
        "Education": 0,
        "Infrastructure and Public Utilities": 0,
        "Livelihood and Financial Support": 0,
        "Others": 0
      };

      complaints.forEach(c => {
        if (categories[c.category] !== undefined) {
          categories[c.category]++;
        } else {
          categories["Others"]++;
        }
      });

      const formatted = Object.keys(categories).map(key => ({
        category: key,
        count: categories[key]
      }));

      setDemandData(formatted);

    } catch (error) {
      console.error("Analytics fetch error:", error);
    }
  };

  fetchAnalytics();
}, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">
        Analytics
        <span className="text-green-400"> Dashboard</span>
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
          >
            <p className="text-sm text-gray-400">{item.label}</p>
            <h2 className="text-3xl font-bold mt-2 text-green-400">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Demand vs Supply */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Demand */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">
            Demand by Category
          </h2>

          <div className="space-y-4">
            {demandData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.category}</span>
                  <span>{item.count}</span>
                </div>

                <div className="w-full bg-black rounded-full h-2">
                  <div
                    className="bg-green-400 h-2 rounded-full"
                    style={{ width: `${(item.count / stats[0].value) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">
            Key Insights
          </h2>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>• Water-related complaints are the highest in demand</li>
            <li>• 59% complaints have been resolved successfully</li>
            <li>• Electricity issues show longer resolution times</li>
            <li>• Rural infrastructure needs urgent attention</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

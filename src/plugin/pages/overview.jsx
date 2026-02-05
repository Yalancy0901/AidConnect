import React from "react";

export default function Analytics() {
  const stats = [
    { label: "Total Complaints", value: 128 },
    { label: "Resolved", value: 76 },
    { label: "In Progress", value: 34 },
    { label: "Pending", value: 18 }
  ];

  const demandData = [
    { category: "Water", count: 42 },
    { category: "Electricity", count: 31 },
    { category: "Roads", count: 27 },
    { category: "Healthcare", count: 18 },
    { category: "Education", count: 10 }
  ];

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
                    style={{ width: `${item.count * 2}%` }}
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

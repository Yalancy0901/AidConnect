import React from "react";

export default function Overview() {
  return (
    <div className="min-h-screen min-w-screen overflow-x-hidden p-6 md:p-10 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-400 mt-2">
          A quick snapshot of complaints and platform activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-green-400 transition">
          <h3 className="text-gray-400 text-sm">Total Complaints</h3>
          <p className="text-3xl font-bold mt-2 text-green-400">128</p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-green-400 transition">
          <h3 className="text-gray-400 text-sm">Resolved</h3>
          <p className="text-3xl font-bold mt-2 text-green-400">86</p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-green-400 transition">
          <h3 className="text-gray-400 text-sm">Pending</h3>
          <p className="text-3xl font-bold mt-2 text-green-400">42</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 divide-y divide-zinc-800">
          {[
            "Water supply issue reported",
            "Streetlight complaint resolved",
            "Garbage collection delayed",
          ].map((item, index) => (
            <div key={index} className="p-4 hover:bg-zinc-800 transition">
              <p className="text-gray-300">{item}</p>
              <span className="text-xs text-gray-500">Just now</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

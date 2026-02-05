import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ---------- MOCK DATA ---------- */

const stats = [
  { label: "Total Demand", value: "₹12.4M" },
  { label: "Total Funded", value: "₹8.1M" },
  { label: "Funding Gap", value: "₹4.3M" },
  { label: "Active Partners", value: "18" },
];

const trendData = [
  { month: "Jan", demand: 120, supply: 90 },
  { month: "Feb", demand: 150, supply: 110 },
  { month: "Mar", demand: 180, supply: 140 },
  { month: "Apr", demand: 200, supply: 150 },
  { month: "May", demand: 220, supply: 170 },
];

const fundingSplit = [
  { name: "CSR Companies", value: 55 },
  { name: "NGOs", value: 25 },
  { name: "Government", value: 20 },
];

const unmetDemand = [
  { name: "Water", value: 35 },
  { name: "Healthcare", value: 30 },
  { name: "Education", value: 20 },
  { name: "Infrastructure", value: 15 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

/* ---------- COMPONENT ---------- */

export default function Analytics() {
  return (
    <div className="p-6 md:p-10 bg-black min-h-screen text-white space-y-10">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-green-400">
        Demand vs Supply Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
          >
            <p className="text-sm text-gray-400">{s.label}</p>
            <p className="text-2xl font-bold mt-2 text-green-400">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LINE CHART */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h2 className="font-semibold mb-4">
            Demand vs Supply Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="demand"
                stroke="#ef4444"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="supply"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* FUNDING SPLIT */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h2 className="font-semibold mb-4">
            Funding Sources
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={fundingSplit}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
              >
                {fundingSplit.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* UNMET DEMAND */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h2 className="font-semibold mb-4">
            Unmet Demand Areas
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={unmetDemand}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
              >
                {unmetDemand.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

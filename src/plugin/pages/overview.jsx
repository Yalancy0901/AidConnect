import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

const COLORS = ["#22c55e", "#4ade80", "#16a34a", "#15803d", "#86efac", "#bbf7d0"];

export default function Analytics() {

  const [stats, setStats] = useState([]);
  const [demandData, setDemandData] = useState([]);
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);

  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    newUsers: 0
  });

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/analytics/dashboard"
        );

        const data = res.data;

        /* Top cards */

        setStats([
          { label: "Total Complaints", value: data.totalComplaints },
          { label: "Resolved", value: data.resolved },
          { label: "In Progress", value: data.inProgress },
          { label: "To Do", value: data.todo }
        ]);

        /* Demand by category */

        setDemandData(
        (data.demandSupplyData || []).map(item => ({
            category: item.category,
              value: item.demand || 0
  }))
);

        /* Status chart */

        setStatusData([
          { name: "Resolved", value: data.resolved },
          { name: "In Progress", value: data.inProgress },
          { name: "To Do", value: data.todo },
          { name: "Unassigned", value: data.unassigned || 0 }
        ]);

        /* Location chart */

        setLocationData(data.locationData || []);

        /* Timeline chart */

        setTimelineData(data.timelineData || []);

        /* Recent complaints */

        setRecentComplaints(data.recentComplaints || []);

        /* User stats */

        setUserStats({
          totalUsers: data.totalUsers || 0,
          newUsers: data.newUsers || 0
        });

      } catch (error) {

        console.error("Analytics fetch error:", error);

      }

    };

    fetchAnalytics();

  }, []);

  return (

    <div className="p-8">

      <h1 className="text-2xl font-bold mb-8">
        Analytics <span className="text-green-400">Dashboard</span>
      </h1>

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-green-500 transition"
          >

            <p className="text-sm text-gray-400">{item.label}</p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              <CountUp end={item.value} duration={1.5} />
            </h2>

          </div>

        ))}

      </div>

      {/* PIE + RECENT */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Demand Pie */}

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

          <h2 className="text-xl font-semibold mb-4">
            Demand by Category
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={demandData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >

                  {demandData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Recent Complaints */}

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

          <h2 className="text-xl font-semibold mb-4">
            Recent Complaints
          </h2>

          <ul className="space-y-3 text-sm text-gray-300">

            {recentComplaints.map((item, index) => (

              <li key={index}>
                {item.category} - {item.location} ({item.status})
              </li>

            ))}

          </ul>

        </div>

      </div>

      {/* USER STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

          <h2 className="text-xl font-semibold mb-4">
            User Statistics
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div>

              <p className="text-sm text-gray-400">
                Total Users
              </p>

              <h3 className="text-2xl font-bold text-green-400">
                {userStats.totalUsers}
              </h3>

            </div>

            <div>

              <p className="text-sm text-gray-400">
                New Users (7 days)
              </p>

              <h3 className="text-2xl font-bold text-green-400">
                {userStats.newUsers}
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* STATUS CHART */}

      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Complaint Status Distribution
        </h2>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={statusData}>

              <CartesianGrid strokeDasharray="3 3" stroke="#333" />

              <XAxis dataKey="name" stroke="#aaa" />

              <YAxis stroke="#aaa" />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="value"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* LOCATION + TIMELINE */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

        {/* Location Chart */}

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

          <h2 className="text-xl font-semibold mb-4">
            Complaints by Location
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={locationData}>

                <CartesianGrid strokeDasharray="3 3" stroke="#333" />

                <XAxis dataKey="location" stroke="#aaa" />

                <YAxis stroke="#aaa" />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#4ade80"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Timeline Chart */}

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

          <h2 className="text-xl font-semibold mb-4">
            Complaints Over Time
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={timelineData}>

                <CartesianGrid strokeDasharray="3 3" stroke="#333" />

                <XAxis dataKey="date" stroke="#aaa" />

                <YAxis stroke="#aaa" />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#16a34a"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  );

}
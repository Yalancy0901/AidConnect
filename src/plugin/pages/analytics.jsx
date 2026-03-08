import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = ["#22c55e","#3b82f6","#f59e0b","#ef4444","#a855f7","#14b8a6"];

export default function Analytics() {

  const [demandSupply, setDemandSupply] = useState([]);
  const [complaintData, setComplaintData] = useState([]);
  const [fundingData, setFundingData] = useState([]);

  const [stats, setStats] = useState({
    totalDemand: 0,
    fundingTotal: 0
  });

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/analytics/dashboard"
      );

      const demandSupplyData = res.data.demandSupplyData || [];

      setDemandSupply(demandSupplyData);

      const complaintChart = demandSupplyData.map(item => ({
        name: item.category,
        value: item.demand
      }));

      const fundingChart = demandSupplyData.map(item => ({
        name: item.category,
        value: item.supply
      }));

      setComplaintData(complaintChart);
      setFundingData(fundingChart);

      const totalDemand = demandSupplyData.reduce(
        (sum, item) => sum + item.demand,
        0
      );

      setStats({
        totalDemand,
        fundingTotal: res.data.fundingTotal
      });

    } catch (error) {

      console.error("Analytics error", error);

    }

  };

  const gap = stats.totalDemand - stats.fundingTotal;

  return (

    <div className="p-8 bg-black min-h-screen text-white space-y-10">

      <h1 className="text-3xl font-bold text-green-400">
        Demand vs Supply Dashboard
      </h1>

      {/* TOP STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-zinc-900 p-6 rounded-lg">
          <p className="text-gray-400">Total Demand</p>
          <p className="text-2xl text-red-400 font-bold">
            ₹{stats.totalDemand.toLocaleString()}
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg">
          <p className="text-gray-400">Total Funding</p>
          <p className="text-2xl text-green-400 font-bold">
            ₹{stats.fundingTotal.toLocaleString()}
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg">
          <p className="text-gray-400">Funding Gap</p>
          <p className="text-2xl text-yellow-400 font-bold">
            ₹{gap.toLocaleString()}
          </p>
        </div>

      </div>

      {/* BAR CHART */}

      <div className="bg-zinc-900 p-6 rounded-lg">

        <h2 className="text-lg font-semibold mb-4">
          Demand vs Supply by Category
        </h2>

        <ResponsiveContainer width="100%" height={400}>

          <BarChart data={demandSupply}>

            <CartesianGrid strokeDasharray="3 3" stroke="#333"/>

            <XAxis
              dataKey="category"
              stroke="#aaa"
              angle={-20}
              textAnchor="end"
              height={80}
            />

            <YAxis stroke="#aaa"/>

            <Tooltip/>

            <Bar dataKey="demand" fill="#ef4444" name="Demand"/>

            <Bar dataKey="supply" fill="#22c55e" name="Supply"/>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* PIE CHARTS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Complaint Distribution */}

        <div className="bg-zinc-900 p-6 rounded-lg">

          <h2 className="text-lg font-semibold mb-4">
            Complaint Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={complaintData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >

                {complaintData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip/>
              <Legend/>

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Funding Distribution */}

        <div className="bg-zinc-900 p-6 rounded-lg">

          <h2 className="text-lg font-semibold mb-4">
            Funding Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={fundingData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >

                {fundingData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip/>
              <Legend/>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}
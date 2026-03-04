import React, { useState } from "react";
import axios from "axios";

function TrackComplaint() {
  const [complaintId, setComplaintId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!complaintId.trim()) {
      alert("Please enter a Complaint ID");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/requests/track/${complaintId}`
      );

      setResult(res.data);
      setError("");
    } catch (err) {
      setError("Complaint not found");
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="bg-zinc-900 p-10 rounded-2xl w-full max-w-md border border-zinc-800">
        
        <h2 className="text-3xl font-bold text-center mb-6">
          Track Your <span className="text-green-400">Complaint</span>
        </h2>

        <form onSubmit={handleSearch} className="space-y-6">
          <input
            type="text"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
            placeholder="Enter your Complaint ID"
            className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:border-green-400 focus:outline-none text-white"
          />

          <button
            type="submit"
            className="w-full bg-green-400 text-black py-3 rounded-full font-semibold"
          >
            Search
          </button>
        </form>

        {error && (
          <p className="text-red-400 mt-4 text-center">{error}</p>
        )}

        {result && (
          <div className="mt-6 bg-black p-4 rounded-xl border border-green-400">
            <p className="text-sm text-gray-400">Tracking ID</p>
            <p className="text-green-400 font-semibold">
              {result.trackingId}
            </p>

            <p className="mt-3 text-sm text-gray-400">Description</p>
            <p>{result.description}</p>

            <p className="mt-3 text-sm text-gray-400">Status</p>
            <p className="text-green-400 font-semibold">
              {result.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackComplaint;
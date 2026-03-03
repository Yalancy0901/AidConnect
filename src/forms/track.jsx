import React, { useState } from "react";

function TrackComplaint() {
  const [complaintId, setComplaintId] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!complaintId.trim()) {
      alert("Please enter a Complaint ID");
      return;
    }

    console.log("Searching for:", complaintId);

    // 👉 Later you can call API here
    // navigate(`/complaint/${complaintId}`)
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="bg-zinc-900 p-10 rounded-2xl w-full max-w-md shadow-lg border border-zinc-800">
        
        <h2 className="text-3xl font-bold text-center mb-6">
          Track Your <span className="text-green-400">Complaint</span>
        </h2>

        <form onSubmit={handleSearch} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Complaint ID
            </label>
            <input
              type="text"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
              placeholder="Enter your Complaint ID"
              className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:border-green-400 focus:outline-none text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-400 text-black py-3 rounded-full font-semibold hover:bg-green-500 transition"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default TrackComplaint;

import React from "react";

function YourComplaints() {
  // 🔹 Temporary dummy data (later replace with API data)
  const complaints = [
    { id: "AC1023", title: "Water supply issue in village" },
    { id: "AC1045", title: "Street light not working near school" },
    { id: "AC1089", title: "Garbage collection delay in ward 5" },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-8 md:px-16 py-20 w-full max-w-xl bg-zinc-900 p-8 rounded-2xl border border-green-400">
      <h1 className="text-4xl font-bold mb-12">
        Your <span className="text-green-400">Complaints</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="bg-zinc-900 border border-zinc-800 hover:border-green-400 p-6 rounded-2xl transition cursor-pointer"
          >
            <p className="text-sm text-gray-400 mb-2">
              Complaint ID
            </p>
            <h3 className="text-lg font-semibold text-green-400">
              {complaint.id}
            </h3>

            <p className="mt-4 text-gray-400 text-sm">
              {complaint.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourComplaints;

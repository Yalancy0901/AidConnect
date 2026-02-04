import { useState } from "react";

const initialData = {
  New: [
    { id: 1, title: "No drinking water", location: "Village A" },
    { id: 2, title: "Road damage", location: "Village B" }
  ],
  Assigned: [
    { id: 3, title: "School roof leakage", location: "Village C" }
  ],
  InProgress: [
    { id: 4, title: "Electricity issue", location: "Village D" }
  ],
  Resolved: []
};

export default function Tracker() {
  const [columns, setColumns] = useState(initialData);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Complaint Tracker
        <span className="text-green-400"> (Kanban)</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(columns).map(([status, complaints]) => (
          <div
            key={status}
            className="bg-zinc-900 rounded-xl p-4 border border-zinc-800"
          >
            <h2 className="text-lg font-semibold mb-4 text-green-400">
              {status}
            </h2>

            <div className="space-y-3">
              {complaints.map((item) => (
                <div
                  key={item.id}
                  className="bg-black p-4 rounded-lg border border-zinc-700 hover:border-green-400 transition cursor-pointer"
                >
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {item.location}
                  </p>
                </div>
              ))}

              {complaints.length === 0 && (
                <p className="text-xs text-gray-500 italic">
                  No complaints
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

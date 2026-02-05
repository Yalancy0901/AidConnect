import React, { useState } from "react";
import { Plus } from "lucide-react";

/* -------- MOCK DATA -------- */

const initialCompanies = [
  {
    id: 1,
    name: "Tata Trusts",
    type: "CSR",
    funding: 2500000,
    villages: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Infosys Foundation",
    type: "CSR",
    funding: 1800000,
    villages: 9,
    status: "Active",
  },
  {
    id: 3,
    name: "State Rural Mission",
    type: "Government",
    funding: 3200000,
    villages: 18,
    status: "Inactive",
  },
];

/* -------- COMPONENT -------- */

export default function Companies() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 md:p-10 bg-black min-h-screen text-white space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">
          Partner Companies
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm text-black"
        >
          <Plus size={16} />
          Add Company
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800 text-gray-300">
            <tr>
              <th className="p-4 text-left">Company</th>
              <th className="p-4">Type</th>
              <th className="p-4">Funding (₹)</th>
              <th className="p-4">Villages</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((c) => (
              <tr
                key={c.id}
                className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
              >
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4 text-center">{c.type}</td>
                <td className="p-4 text-center">
                  ₹{(c.funding / 100000).toFixed(1)}L
                </td>
                <td className="p-4 text-center">{c.villages}</td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      c.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD COMPANY MODAL */}
      {showModal && (
        <AddCompanyModal
          onClose={() => setShowModal(false)}
          onAdd={(company) => {
            setCompanies([...companies, company]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

/* -------- MODAL -------- */

function AddCompanyModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    type: "CSR",
    funding: "",
    villages: "",
    status: "Active",
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-md space-y-4 border border-zinc-800">
        <h2 className="text-xl font-semibold text-blue-400 ">
          Add Company
        </h2>

        <input
          placeholder="Company Name"
          className="w-full p-2 rounded bg-black border border-zinc-700"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="w-full p-2 rounded bg-black border border-zinc-700"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>CSR</option>
          <option>NGO</option>
          <option>Government</option>
          <option>Private</option>
        </select>

        <input
          type="number"
          placeholder="Funding Amount"
          className="w-full p-2 rounded bg-black border border-zinc-700"
          value={form.funding}
          onChange={(e) => setForm({ ...form, funding: e.target.value })}
        />

        <input
          type="number"
          placeholder="Active Villages"
          className="w-full p-2 rounded bg-black border border-zinc-700"
          value={form.villages}
          onChange={(e) => setForm({ ...form, villages: e.target.value })}
        />

        <select
          className="w-full p-2 rounded bg-black border border-zinc-700"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-black rounded bg-zinc-700 hover:bg-zinc-600"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onAdd({
                ...form,
                id: Date.now(),
                funding: Number(form.funding),
                villages: Number(form.villages),
              })
            }
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-black"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

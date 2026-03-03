import React, { useState } from "react";

function Suggestions() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    village: "",
    category: "",
    suggestion: "",
    anonymous: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form); // backend later
    alert("Thank you for your suggestion!");

    setForm({
      name: "",
      email: "",
      village: "",
      category: "",
      suggestion: "",
      anonymous: false,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl border border-green-400">

        <h1 className="text-2xl font-bold text-green-400 mb-6 text-center">
          Submit a Suggestion
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Anonymous Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.anonymous}
              onChange={(e) =>
                setForm({ ...form, anonymous: e.target.checked })
              }
              className="accent-green-400"
            />
            <label className="text-sm text-gray-400">
              Submit anonymously
            </label>
          </div>

          {/* Name */}
          {!form.anonymous && (
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full p-3 rounded bg-black border border-zinc-700 focus:border-green-400 outline-none"
            />
          )}

          {/* Email */}
          {!form.anonymous && (
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full p-3 rounded bg-black border border-zinc-700 focus:border-green-400 outline-none"
            />
          )}

          {/* Village */}
          <input
            type="text"
            placeholder="Village Name"
            value={form.village}
            onChange={(e) =>
              setForm({ ...form, village: e.target.value })
            }
            className="w-full p-3 rounded bg-black border border-zinc-700 focus:border-green-400 outline-none"
          />

          {/* Category Dropdown */}
          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="w-full p-3 rounded bg-black border border-zinc-700 focus:border-green-400 outline-none"
          >
            <option value="">Select Category</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Water & Sanitation">Water & Sanitation</option>
            <option value="Other">Other</option>
          </select>

          {/* Suggestion */}
          <textarea
            rows="5"
            placeholder="Write your suggestion..."
            value={form.suggestion}
            onChange={(e) =>
              setForm({ ...form, suggestion: e.target.value })
            }
            required
            className="w-full p-3 rounded bg-black border border-zinc-700 focus:border-green-400 outline-none resize-none"
          />

          <button
            type="submit"
            className="w-full bg-green-400 text-black py-3 rounded-full font-semibold hover:bg-green-500 transition"
          >
            Submit Suggestion
          </button>

        </form>
      </div>
    </div>
  );
}

export default Suggestions;

import React, { useState } from "react";
import axios from "axios";

function RaiseComplaint() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    category: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/requests",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(`Complaint Submitted! Tracking ID: ${res.data.trackingId}`);

    setForm({
      fullName: "",
      email: "",
      mobile: "",
      category: "",
      location: "",
      description: "",
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Something went wrong");
  }
};

  return (
    <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl border border-green-400">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-white">
        Raise Complaint
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>

        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full bg-black border border-zinc-700 text-white rounded-full px-4 py-2"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full bg-black border border-zinc-700 text-white rounded-full px-4 py-2"
        />

        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="w-full bg-black border border-zinc-700 text-white rounded-full px-4 py-2"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full bg-black border border-zinc-700 text-white rounded-full px-4 py-2"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full bg-black border border-zinc-700 text-white rounded-full px-4 py-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Complaint Description"
          className="w-full bg-black border border-zinc-700 text-white rounded-lg px-4 py-2"
        />

        <button
          type="submit"
          className="bg-green-400 text-black px-10 py-2 rounded-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RaiseComplaint;
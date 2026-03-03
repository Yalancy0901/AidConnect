import React, { useState } from "react";

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // connect backend later
    alert("Message submitted successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl border border-green-400">

        <h1 className="text-2xl font-bold text-green-400 mb-6 text-center">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 rounded bg-black border border-zinc-700 focus:border-green-400 outline-none"
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 rounded bg-black border border-zinc-700 focus:border-green-400 outline-none"
          />

          <input
            type="text"
            placeholder="Subject"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full p-3 rounded bg-black border border-zinc-700 focus:border-green-400 outline-none"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full p-3 rounded bg-black border border-zinc-700 focus:border-green-400 outline-none resize-none"
          />

          <button
            type="submit"
            className="w-full bg-green-400 text-black py-3 rounded-full font-semibold hover:bg-green-500 transition"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}

export default ContactUs;

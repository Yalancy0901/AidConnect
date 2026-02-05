import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen min-w-screen bg-black text-white">
    <nav className="flex items-center justify-between px-8 md:px-16 py-6">
  <h1
    onClick={() => navigate("/")}
    className="text-xl font-bold text-green-400 cursor-pointer"
  >
    AidConnect
  </h1>

  <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
    <span
      onClick={() => navigate("/forms/raisecomplaint")}
      className="hover:text-green-400 cursor-pointer"
    >
      Raise Complaint
    </span>

    <span
      onClick={() => navigate("/forms")}
      className="hover:text-green-400 cursor-pointer"
    >
      Track Complaint
    </span>

    {/* TEMPORARY DASHBOARD BUTTON */}
    <span
      onClick={() => navigate("/crm")}
      className="hover:text-green-400 cursor-pointer text-yellow-400"
      title="Temporary route"
    >
      Dashboard
    </span>

    <button
      onClick={() => navigate("/auth")}
      className="border border-green-400 px-4 py-2 rounded-full text-green-400 hover:bg-green-400 hover:text-black transition"
    >
      Sign In
    </button>
  </div>
</nav>


      <section className="px-8 md:px-16 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Connecting Communities. <br />
          <span className="text-green-400">Empowering Voices.</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          A unified platform that ensures every complaint is heard and addressed transparently.
        </p>

        <button className="mt-8 bg-green-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-500 transition">
          Get Started
        </button>
      </section>

      <section className="px-8 md:px-16 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold">
            Connecting organizations across communities to{" "}
            <span className="text-green-400">support people better.</span>
          </h2>

          <p className="mt-4 text-gray-400">
            We see you, we hear you, and we empower you.
          </p>

          <button
        onClick={() => navigate("/forms/raisecomplaint")}
        className="mt-6 bg-green-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-green-500 transition">
            Raise Complaint
          </button>
        </div>

        <div className="md:w-1/2">
          <img src="/hero-illustration.png" alt="Community support" className="w-full" />
        </div>
      </section>

      <section className="px-8 md:px-16 py-20 grid md:grid-cols-3 gap-8">
        {["Transparent Tracking", "Community Driven", "Fast Resolution"].map(
          (feature, index) => (
            <div
              key={index}
              className="bg-zinc-900 p-6 rounded-2xl hover:border hover:border-green-400 transition"
            >
              <h3 className="text-xl font-semibold text-green-400">{feature}</h3>
              <p className="mt-3 text-gray-400 text-sm">
                Empowering users with clarity, accountability, and trust.
              </p>
            </div>
          )
        )}
      </section>

      <section className="px-8 md:px-16 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to make your voice heard?
        </h2>

        <button className="mt-6 bg-green-400 text-black px-10 py-3 rounded-full font-semibold hover:bg-green-500 transition">
          Raise a Complaint
        </button>
      </section>

      <footer className="px-8 md:px-16 py-10 text-center text-gray-500 text-sm border-t border-zinc-800">
        © 2026 AidConnect. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";

function AboutUs() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen min-w-screen bg-black text-white">
      {/* NAVIGATION HEADER (same as Home) */}
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

          <span
            onClick={() => navigate("/crm")}
            className="hover:text-green-400 cursor-pointer text-yellow-400"
            title="Temporary route"
          >
            Dashboard
          </span>

          <span
            onClick={() => navigate("/aboutus")}
            className="hover:text-green-400 cursor-pointer"
          >
            About Us
          </span>

          {token ? (
            <>
              <img
                onClick={() => navigate("/profile")}
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-400"
              />
              <button
                onClick={handleLogout}
                className="border border-red-500 px-4 py-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="border border-green-400 px-4 py-2 rounded-full text-green-400 hover:bg-green-400 hover:text-black transition"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* ABOUT US CONTENT */}
      <section className="px-8 md:px-16 py-24 bg-gray-900 text-white">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          About <span className="text-green-400">AidConnect</span>
        </h2>

        <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-6">
          AidConnect is a unified platform that connects communities with NGOs
          to ensure that every complaint and concern is heard and addressed
          transparently. We empower citizens, support organizations, and
          strengthen grassroots initiatives to make a real impact.
        </p>

        <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-6">
          Our mission is to bridge the gap between communities and service
          providers, streamline complaint management, and provide actionable
          insights to NGOs for better decision-making.
        </p>

        <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-6">
          With AidConnect, we aim to make civic engagement simple, effective,
          and transparent—helping build stronger, more responsive communities
          across the country.
        </p>
      </section>

      {/* TEAM / VALUES / IMAGE Section (Optional) */}
      <section className="px-8 md:px-16 py-24 flex flex-col md:flex-row items-center gap-12 bg-black">
        <div className="md:w-1/2">
          <h3 className="text-3xl font-bold mb-4">Our Values</h3>
          <ul className="list-disc ml-5 text-gray-400 space-y-2">
            <li>Transparency in every action we take</li>
            <li>Empowering communities and individuals</li>
            <li>Collaboration with NGOs for maximum impact</li>
            <li>Innovation in civic tech solutions</li>
          </ul>
        </div>
        <div className="md:w-1/2">
          <img
            src={logo}
            alt="Teamwork and community"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* FOOTER (same as Home) */}
      <footer className="px-8 md:px-16 py-16 bg-zinc-900 text-gray-400 border-t border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div>
            <h3 className="text-white font-semibold mb-5 tracking-wide">PLATFORM</h3>
            <ul className="space-y-3">
              <li className="hover:text-green-400 cursor-pointer">Raise Complaint</li>
              <li className="hover:text-green-400 cursor-pointer">Track Complaint</li>
              <li className="hover:text-green-400 cursor-pointer">Your Complaints</li>
              <li className="hover:text-green-400 cursor-pointer">Submit Suggestion</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-5 tracking-wide">SUPPORT</h3>
            <ul className="space-y-3">
              <li className="hover:text-green-400 cursor-pointer">Help Center</li>
              <li className="hover:text-green-400 cursor-pointer">FAQs</li>
              <li className="hover:text-green-400 cursor-pointer">Report Issue</li>
              <li className="hover:text-green-400 cursor-pointer">User Guide</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-5 tracking-wide">ORGANIZATIONS</h3>
            <ul className="space-y-3">
              <li className="hover:text-green-400 cursor-pointer">Partner NGOs</li>
              <li className="hover:text-green-400 cursor-pointer">Corporate Sponsors</li>
              <li className="hover:text-green-400 cursor-pointer">Become a Partner</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-5 tracking-wide">CONTACT</h3>
            <ul className="space-y-3">
              <li>AidConnect Platform</li>
              <li>Chennai, India</li>
              <li>support@aidconnect.org</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 AidConnect. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-green-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-green-400 cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;
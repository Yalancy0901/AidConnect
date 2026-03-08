import React from "react";
import { useNavigate } from "react-router-dom";
import crm1 from "../images/crm1.jpg";
import prgm from "../images/prgm.jpg";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  
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
    <span
      onClick={() => navigate("/aboutus")}
      className="hover:text-green-400 cursor-pointer"
    >
      About Us
    </span>

    {token ? (
  <>
    {/* Profile Image */}
    <img
      onClick={() => navigate("/profile")}
      src="https://i.pravatar.cc/40"
      alt="profile"
      className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-400"
    />

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="border border-red-500 px-4 py-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition"
    >
      Logout
    </button>
  </>
) : (
  <>
    
    <button
      onClick={() => navigate("/auth")}
      className="border border-green-400 px-4 py-2 rounded-full text-green-400 hover:bg-green-400 hover:text-black transition"
    >
      Sign In
    </button>
  </>
)}
  </div>
</nav>
      <section className="relative h-screen w-full overflow-hidden">
  {/* YouTube Background */}
  <iframe
    className="absolute top-0 left-0 w-full h-full scale-125 pointer-events-none"
    src="https://www.youtube.com/embed/Sqqj_14wBxU?autoplay=1&mute=1&loop=1&playlist=Sqqj_14wBxU&controls=0&showinfo=0&rel=0&modestbranding=1"
    title="AidConnect Background"
    frameBorder="0"
    allow="autoplay; fullscreen"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60 z-10" />

  {/* Content */}
  <div className="relative z-20 h-full flex items-center justify-center px-8 md:px-16 text-center">
    <div>
      <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        Connecting Communities. <br />
        <span className="text-green-400">Empowering Voices.</span>
      </h1>

      <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
        A unified platform that ensures every complaint is heard and addressed transparently.
      </p>

      <button
        onClick={() => navigate("/forms/raisecomplaint")}
        className="mt-8 bg-green-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-500 transition"
      >
        Get Started
      </button>
    </div>
  </div>
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
          <img src={crm1} alt="Community support" className="w-full" />
        </div>
      </section>

      {/* OUR IMPACT */}
<section className="bg-zinc-300 text-black px-8 md:px-16 py-24">
  <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
    OUR IMPACT
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
    <div>
      <h3 className="text-6xl font-extrabold text-green-500">20+</h3>
      <p className="mt-4 font-semibold text-green-600 uppercase">Lac</p>
      <p className="mt-2 text-sm text-gray-700">
        children and their families are impacted every year
      </p>
    </div>

    <div>
      <h3 className="text-6xl font-extrabold text-green-500">2000+</h3>
      <p className="mt-4 font-semibold text-green-600 uppercase">Villages</p>
      <p className="mt-2 text-sm text-gray-700">
        and slums are reached across the country
      </p>
    </div>

    <div>
      <h3 className="text-6xl font-extrabold text-green-500">400+</h3>
      <p className="mt-4 font-semibold text-green-600 uppercase">Projects</p>
      <p className="mt-2 text-sm text-gray-700">
        focused on education, healthcare and women empowerment
      </p>
    </div>

    <div>
      <h3 className="text-6xl font-extrabold text-green-500">27+</h3>
      <p className="mt-4 font-semibold text-green-600 uppercase">States</p>
      <p className="mt-2 text-sm text-gray-700">
        are reached including the remotest areas
      </p>
    </div>
  </div>
</section>


      {/* OUR PROGRAMMES */}
<section className="bg- black px-8 md:px-16 py-24">
  <h2 className="text-center text-white text-3xl md:text-4xl font-bold mb-16">
    OUR PROGRAMMES
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white ">
    {[
      {
        title: "Education",
        desc: "Education nutrition and holistic development of children",
      },
      {
        title: "Healthcare",
        desc: "Taking healthcare services to doorsteps of hard to reach communities",
      },
      {
        title: "Women Empowerment",
        desc: "Empowering adolescent girls & women through community engagement",
      },
      {
        title: "Livelihood",
        desc: "Skill training and placement support for underprivileged youth",
      },
      {
        title: "Empowering Grassroots",
        desc: "Helping community-based organizations become locally sustainable",
      },
      {
        title: "Disaster Response",
        desc: "Reach out and respond to the needs of disaster-affected people",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="flex items-start gap-4 p-6 rounded-xl hover:shadow-md transition border border-white"
      >
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
          ✓
        </div>

        <div>
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>


      <footer className="px-8 md:px-16 py-16 bg-zinc-900 text-gray-400 border-t border-zinc-800">

  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">

    {/* PLATFORM */}
    <div>
      <h3 className="text-white font-semibold mb-5 tracking-wide">
        PLATFORM
      </h3>

      <ul className="space-y-3">
        <li className="hover:text-green-400 cursor-pointer">Raise Complaint</li>
        <li className="hover:text-green-400 cursor-pointer">Track Complaint</li>
        <li className="hover:text-green-400 cursor-pointer">Your Complaints</li>
        <li className="hover:text-green-400 cursor-pointer">Submit Suggestion</li>
      </ul>
    </div>

    {/* SUPPORT */}
    <div>
      <h3 className="text-white font-semibold mb-5 tracking-wide">
        SUPPORT
      </h3>

      <ul className="space-y-3">
        <li className="hover:text-green-400 cursor-pointer">Help Center</li>
        <li className="hover:text-green-400 cursor-pointer">FAQs</li>
        <li className="hover:text-green-400 cursor-pointer">Report Issue</li>
        <li className="hover:text-green-400 cursor-pointer">User Guide</li>
      </ul>
    </div>

    {/* ORGANIZATIONS */}
    <div>
      <h3 className="text-white font-semibold mb-5 tracking-wide">
        ORGANIZATIONS
      </h3>

      <ul className="space-y-3">
        <li className="hover:text-green-400 cursor-pointer">Partner NGOs</li>
        <li className="hover:text-green-400 cursor-pointer">Corporate Sponsors</li>
        <li className="hover:text-green-400 cursor-pointer">Become a Partner</li>
      </ul>
    </div>

    {/* CONTACT */}
    <div>
      <h3 className="text-white font-semibold mb-5 tracking-wide">
        CONTACT
      </h3>

      <ul className="space-y-3">
        <li>AidConnect Platform</li>
        <li>Chennai, India</li>
        <li>support@aidconnect.org</li>
        <li>+91 98765 43210</li>
      </ul>
    </div>

  </div>

  {/* Bottom bar */}
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

export default Home;

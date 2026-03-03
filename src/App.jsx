import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/homepage";
import Layout from "./forms/layout";
import RaiseComplaint from "./forms/raisecomplaint";
import TrackComplaint from "./forms/track";
import YourComplaint from "./forms/yourcomplaint";
import Help from "./forms/help";
import Suggestion from "./forms/suggestion";
import LoginSignup from "./pages/signup";
import CRMPlugin from "./plugin";
import Profile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/profile" element={<Profile />} />
        {/* CRM PLUGIN MOUNT POINT */}
        <Route path="/crm/*" element={<CRMPlugin />} />

        <Route path="/forms" element={<Layout />}>
          <Route index element={<Navigate to="raisecomplaint" replace />} />
          <Route path="raisecomplaint" element={<RaiseComplaint />} />
          <Route path="track" element={<TrackComplaint />} />
        <Route path="yourcomplaint" element={<YourComplaint />} />
        <Route path="help" element={<Help />} />
        <Route path="suggestion" element={<Suggestion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

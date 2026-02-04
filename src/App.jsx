import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/homepage";
import Layout from "./forms/layout";
import RaiseComplaint from "./forms/raisecomplaint";
import LoginSignup from "./pages/signup";
import CRMPlugin from "./plugin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginSignup />} />
        {/* CRM PLUGIN MOUNT POINT */}
        <Route path="/crm/*" element={<CRMPlugin />} />

        <Route path="/forms" element={<Layout />}>
          <Route index element={<Navigate to="raisecomplaint" replace />} />
          <Route path="raisecomplaint" element={<RaiseComplaint />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

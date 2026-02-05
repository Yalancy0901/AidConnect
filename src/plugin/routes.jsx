import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout";

import Overview from "./pages/overview";
import Tracker from "./pages/tracker";
import Complaints from "./pages/complaints";
import Analytics from "./pages/analytics";
import Companies from "./pages/companies";

export default function PluginRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* /dashboard */}
        <Route index element={<Overview />} />

        {/* /dashboard/tracker */}
        <Route path="tracker" element={<Tracker />} />

        {/* /dashboard/complaints */}
        <Route path="complaints" element={<Complaints />} />

        {/* /dashboard/analytics */}
        <Route path="analytics" element={<Analytics />} />

        {/* /dashboard/companies */}
        <Route path="companies" element={<Companies />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  );
}

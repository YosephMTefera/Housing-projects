import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import Settings from "./settings/Settings";
import Accusations from "./accusations/Accusations";
import AccusationDetail from "./accusations/AccusationDetail";
import NotFound from "./NotFound";

function Content() {
  return (
    <div className="w-[85%] absolute right-0 z-[-1] bg-white flex flex-col">
      <DashboardNavbar />
      <Routes>
        <Route path="/" element={<Accusations />} />
        <Route path="/accusation/:id" element={<AccusationDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Content;

import React from "react";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import { Routes, Route } from "react-router-dom";
import Cases from "./Cases";
import Summary from "./Summary";
import CaseStatus from "./CaseStatus";
import CaseDetail from "./CaseDetail";
import Settings from "./Settings";
import PageNotFound from "./PageNotFound";


function DashboardContent() {
  return (
    <div className="absolute right-0 w-[83%] min-h-[100%]   bg-gray-50  flex flex-col   max-md2:w-[100%] max-lg1:w-[80%]">
      <DashboardNavbar />
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/casestatus" element={<CaseStatus />} />
        <Route path="/case/:id" element={<CaseDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default DashboardContent;

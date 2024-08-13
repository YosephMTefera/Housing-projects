import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import Cases from "./cases/Cases";
import Settings from "./settings/Settings";
import CreateCase from "./cases/CreateCase";
import CheckStatus from "./cases/CheckStatus";
import CaseDetail from "./cases/CaseDetail";
import ReadyToPrint from "./cases/ReadyToPrint";
import Dashboard from "./Dashboard/Dashboard";
import PageNotFound from "./PageNotFound";


function Content() {
  return (
    <div className="w-[85%] absolute right-0 z-[-1] bg-white flex flex-col">
      <DashboardNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/:id" element={<CaseDetail />} />
        <Route path="/print/:id" element={<ReadyToPrint />} />
        <Route path="/createcase" element={<CreateCase />} />
        <Route path="/checkstatus" element={<CheckStatus />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </div>
  );
}

export default Content;

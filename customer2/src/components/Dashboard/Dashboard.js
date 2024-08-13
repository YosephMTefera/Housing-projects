import React from "react";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import ResponsiveSideabr from "../ResponsiveSidebar";
import { useSelector } from "react-redux";

function Dashboard() {
  const applicationState = useSelector((state) => state?.application);
  return (
    <div className="w-[100%] h-[100vh] flex">
      <Sidebar />
      <DashboardContent />
      {applicationState.sidebarOpened && <ResponsiveSideabr />}
    </div>
  );
}

export default Dashboard;

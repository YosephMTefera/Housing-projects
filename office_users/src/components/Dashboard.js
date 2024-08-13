import React from "react";
import DashboardCards from "./DashboardSections/DashboardCards";
import AdministrtorsChart from "./DashboardSections/AdministrtorsChart";
import DivisionCaseChart from "./DashboardSections/DivisionCaseChart";
import CaseCharts from "./DashboardSections/CaseCharts";
import MonthlyCaseAnalysis from "./DashboardSections/MonthlyCaseAnalysis";

function Dashboard() {
  return (
    <div className="w-[90%] my-[20px] mx-auto flex flex-col gap-[20px] max-lg2:w-[95%]">
      <DashboardCards />
      <MonthlyCaseAnalysis />
      <AdministrtorsChart />
      <CaseCharts />
      <DivisionCaseChart />
    </div>
  );
}

export default Dashboard;

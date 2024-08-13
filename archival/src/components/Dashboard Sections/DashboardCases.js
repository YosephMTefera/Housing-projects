import React from "react";
import MonthlyIncomingLetterAnalysis from "./MonthlyIncomingLetterAnalysis";
import MonthlyOutgoingLetterAnalysis from "./MonthlyOutgoingLetterAnalysis";
import MonthlyInternalLetterAnalyisis from "./MonthlyInternalLetterAnalyisis";
import WeeklyIncomingLetterAnalysis from "./WeeklyIncomingLetterAnalysis";
import WeeklyOutgoingLetterAnalysis from "./WeeklyOutgoingLetterAnalysis";
import WeeklyInternalLetterAnalysis from "./WeeklyInternalLetterAnalysis";
import WeeklyRespondedCasesAnalysis from "./WeeklyRespondedCasesAnalysis";
import CaseStatusAnalysis from "./CaseStatusAnalysis";
import WeeklyVerifiedCasesAnalysis from "./WeeklyVerifiedCasesAnalysis";

function DashboardCases() {
  return (
    <div className="w-[100%] mx-auto  my-[20px] grid grid-cols-2 gap-[10px]">
      <CaseStatusAnalysis />
      <WeeklyRespondedCasesAnalysis />
      <MonthlyIncomingLetterAnalysis />
      <MonthlyOutgoingLetterAnalysis />
      <MonthlyInternalLetterAnalyisis />
      <WeeklyVerifiedCasesAnalysis />
      <WeeklyIncomingLetterAnalysis />
      <WeeklyOutgoingLetterAnalysis />
      <WeeklyInternalLetterAnalysis />
    </div>
  );
}

export default DashboardCases;

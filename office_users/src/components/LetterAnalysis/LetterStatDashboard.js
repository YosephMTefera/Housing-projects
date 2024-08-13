import React from 'react'
import MonthlyIncomingLetterAnalysis from './MonthlyIncomingLetterAnalysis';
import MonthlyOutgoingLetterAnalysis from './MonthlyOutgoingLetterAnalysis';
import MonthlyInternalLetterAnalyisis from './MonthlyInternalLetterAnalyisis';
import WeeklyIncomingLetterAnalysis from './WeeklyIncomingLetterAnalysis';
import WeeklyOutgoingLetterAnalysis from './WeeklyOutgoingLetterAnalysis';
import WeeklyInternalLetterAnalysis from './WeeklyInternalLetterAnalysis';

function LetterStatDashboard() {
 
  return (
    <div className='w-[95%]  mx-auto  my-[20px] grid grid-cols-2 gap-[10px]'>

          <MonthlyIncomingLetterAnalysis />
         <MonthlyOutgoingLetterAnalysis />
          <MonthlyInternalLetterAnalyisis />
          <WeeklyIncomingLetterAnalysis/>
          <WeeklyOutgoingLetterAnalysis />
          <WeeklyInternalLetterAnalysis />
         
         
          
        </div>
  )
}

export default LetterStatDashboard
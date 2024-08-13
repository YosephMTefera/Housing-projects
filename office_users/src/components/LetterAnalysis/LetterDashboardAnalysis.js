import React from 'react'
import LetterDashboardCards from './LetterDashboardCards'
import LetterStatDashboard from './LetterStatDashboard'
import LateLetterAnalysis from './LateLetterAnalysis'

function LetterDashboardAnalysis() {
 
  return (<div className='w-[100%] bg-white min-h-[100vh]'>
  <LetterDashboardCards />
  <LateLetterAnalysis />
  <LetterStatDashboard />
  </div>

  )
}

export default LetterDashboardAnalysis
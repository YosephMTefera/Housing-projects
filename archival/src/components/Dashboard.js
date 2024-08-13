import React from 'react'
import DashboardCards from './Dashboard Sections/DashboardCards'
import DashboardCases from './Dashboard Sections/DashboardCases'

function Dashboard() {
  return (
    <div className='w-[95%] my-[20px] mx-auto'>
      <DashboardCards />
      <DashboardCases />
    </div>
  )
}

export default Dashboard
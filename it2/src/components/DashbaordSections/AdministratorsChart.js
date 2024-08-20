import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import ReactEcharts from "echarts-for-react";
import { fetchAllOfficeUsers } from '../../REDUX/slices/allOfficeUsersSlice';
import { adminChartFun } from '../../utils/data';


function AdministratorsChart() {
    const dispatch = useDispatch();
    const officeUserState = useSelector((state)=>state.allOfficers);

    useEffect(()=>{

        dispatch(fetchAllOfficeUsers());

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    const mainExecutiveOfficers = officeUserState?.officeUsers?.filter((user)=>user?.level==="MainExecutive");
    const divisionManagersOfficers = officeUserState?.officeUsers?.filter((user)=>user?.level==="DivisionManagers");
    const directorsOfficers = officeUserState?.officeUsers?.filter((user)=>user?.level==="Directors");
    const teamLeadersOfficers = officeUserState?.officeUsers?.filter((user)=>user?.level==="TeamLeaders");
    const professionalsOfficers = officeUserState?.officeUsers?.filter((user)=>user?.level==="Professionals");

    const activeOfficers = officeUserState?.officeUsers?.filter((user)=>user?.status==="active");
    const inactiveOfficers = officeUserState?.officeUsers?.filter((user)=>user?.status==="inactive");

    const maleOfficers = officeUserState?.officeUsers?.filter((user)=>user?.gender==="Male");
    const femaleOfficers = officeUserState?.officeUsers?.filter((user)=>user?.gender==="Female");



    
  const levelAdminCharOptions = adminChartFun([
    { value: mainExecutiveOfficers ? mainExecutiveOfficers?.length:0, name: "Main Executive" },
    { value: divisionManagersOfficers ? divisionManagersOfficers?.length:0, name: "Division Managers" },
    { value: directorsOfficers ? directorsOfficers?.length:0, name: "Directors" },
    { value: teamLeadersOfficers ? teamLeadersOfficers?.length:0, name: "Team Leaders" },
    { value: professionalsOfficers ? professionalsOfficers?.length:0, name: "Professionals" },
  ]);

  const genderAdminCharOptions = adminChartFun([
    { value: maleOfficers ? maleOfficers?.length:0, name: "Male" },
    { value: femaleOfficers ? femaleOfficers?.length:0, name: "Female" },

  ]);
      
  const statusAdminCharOptions = adminChartFun([
    { value: activeOfficers ? activeOfficers?.length:0, name: "Active" },
    { value: inactiveOfficers ? inactiveOfficers?.length:0, name: "Inactive" },

  ]);


  return (
    <div className='w-[100%] my-[30px] grid grid-cols-3 gap-[10px]'>
        <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>
                <span className='font-bold text-[#0C73B8] max-lg2:text-[14px]'>Administrators Level</span>
           
            <div className="w-[100%]">
              <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
                <ReactEcharts option={levelAdminCharOptions} />
                {/* <span className='font-bold text-[#1B3E74]'>No Available Data</span> */}
              </div>
        
          </div>

        </div>
        <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>
                <span className='font-bold text-[#0C73B8] max-lg2:text-[14px]'>Administrators Gender</span>
           
            <div className="w-[100%]">
              <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
                <ReactEcharts option={genderAdminCharOptions} />
                {/* <span className='font-bold text-[#1B3E74]'>No Available Data</span> */}
              </div>
        
          </div>

        </div>
        <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>

        <span className='font-bold text-[#0C73B8] max-lg2:text-[14px]'>Administrators Status</span>
<div className="w-[100%]">
  <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
    <ReactEcharts option={statusAdminCharOptions} />
    {/* <span className='font-bold text-[#1B3E74]'>No Available Data</span> */}
  </div>

</div>

</div>
    </div>
  )
}

export default AdministratorsChart
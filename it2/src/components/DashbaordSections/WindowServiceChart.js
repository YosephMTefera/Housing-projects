import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import apiRequest from '../../utils/request';
import { windowChartFun } from '../../utils/data';
import ServerError from '../ServerError';

function WindowServiceChart() {
    const token = sessionStorage.getItem('tID');
    const [windowAnalysis,setWindowAnalyisis] = useState({});
    const [serverError,setServerError] = useState(false);

    useEffect(()=>{
        try {
            apiRequest.get('/window_service_user_api/get_window_analysis',{headers:{
                get_windusers_api:process.env.REACT_APP_GET_WINDUSERS_API,
                Authorization:`Bearer ${token}`
            }}).then((res)=>{
                setWindowAnalyisis(res.data);
            }).catch((error)=>{
                if(error?.response?.status ===500){
                    setServerError(true)
                }
            })
            
        } catch (error) {
       
            setServerError(true)
            
        }
    },[token])


    const genderWindowCharOptions = windowChartFun([
        { value: windowAnalysis ? windowAnalysis?.maleUsers:0, name: "Male" },
        { value: windowAnalysis ?  windowAnalysis?.femaleUsers:0, name: "Female" },
    
      ]);
          
      const statusWindowCharOptions = windowChartFun([
        { value: windowAnalysis ? windowAnalysis?.activeUsers:0, name: "Active" },
        { value: windowAnalysis ? windowAnalysis?.inactiveUsers:0, name: "Inactive" },
    
      ]);


      if(serverError) return <ServerError />
    
  return (
    <div className='w-[100%] my-[30px] grid grid-cols-2 gap-[10px]'>
        <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>
                <span className='font-bold text-[#0C73B8] max-lg2:text-[14px]'>Window Service Gender</span>
           
            <div className="w-[100%]">
              <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
                <ReactEcharts option={genderWindowCharOptions} />
                {/* <span className='font-bold text-[#1B3E74]'>No Available Data</span> */}
              </div>
        
          </div>

        </div>
       
        <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>

        <span className='font-bold text-[#0C73B8] max-lg2:text-[14px]'>Window Service Status</span>
<div className="w-[100%]">
  <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
    <ReactEcharts option={statusWindowCharOptions} />
    {/* <span className='font-bold text-[#1B3E74]'>No Available Data</span> */}
  </div>

</div>

</div>
    </div>
  )
}

export default WindowServiceChart
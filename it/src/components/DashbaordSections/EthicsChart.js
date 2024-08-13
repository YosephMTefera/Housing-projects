import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import apiRequest from '../../utils/request';
import { ethicsChartFun } from '../../utils/data';
import ServerError from '../ServerError';

function EthicsChart() {
    const token = sessionStorage.getItem('tID');
    const [ethicsAnalysis,setEthicsAnalyisis] = useState({});
    const [serverError,setServerError] = useState(false);

    
    useEffect(()=>{
        try {
            apiRequest.get('/accusation_acceptor_user_api/get_accusation_analysis',{headers:{
                get_accusers_api:process.env.REACT_APP_GET_ACCUSERS_API,
                Authorization:`Bearer ${token}`
            }}).then((res)=>{
                setEthicsAnalyisis(res.data);
            }).catch((error)=>{
                if(error?.response?.status ===500){
                    setServerError(true)
                }
            })
            
        } catch (error) {
       
            setServerError(true)
            
        }
    },[token])


    const genderEthicsCharOptions = ethicsChartFun([
        { value: ethicsAnalysis ? ethicsAnalysis?.maleUsers:0, name: "Male" },
        { value: ethicsAnalysis ?  ethicsAnalysis?.femaleUsers:0, name: "Female" },
    
      ]);
          
      const statusEthicsCharOptions = ethicsChartFun([
        { value: ethicsAnalysis ? ethicsAnalysis?.activeUsers:0, name: "Active" },
        { value: ethicsAnalysis ? ethicsAnalysis?.inactiveUsers:0, name: "Inactive" },
    
      ]);


      if(serverError) return <ServerError />
  return (
    <div className='w-[100%] my-[30px] grid grid-cols-2 gap-[10px]'>
    <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>
            <span className='font-bold text-[#0C73B8] max-lg2:text-[14px]'>Accusation Gender</span>
       
        <div className="w-[100%]">
          <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
            <ReactEcharts option={genderEthicsCharOptions} />
            {/* <span className='font-bold text-[#1B3E74]'>No Available Data</span> */}
          </div>
    
      </div>

    </div>
   
    <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>

    <span className='font-bold text-[#0C73B8] max-lg2:text-[14px]'>Accusation Status</span>
<div className="w-[100%]">
<div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
<ReactEcharts option={statusEthicsCharOptions} />
{/* <span className='font-bold text-[#1B3E74]'>No Available Data</span> */}
</div>

</div>

</div>
</div>
  )
}

export default EthicsChart
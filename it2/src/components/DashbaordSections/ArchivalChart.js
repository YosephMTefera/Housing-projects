import React,{useEffect,useState} from 'react'
import ReactEcharts from "echarts-for-react";
import { archivalChartFun } from '../../utils/data';
import apiRequest from '../../utils/request';
import ServerError from '../ServerError';

function ArchivalChart() {
    const token = sessionStorage.getItem('tID');
    const [archivalAnalysis,setArchivalAnalyisis] = useState({});
    const [serverError,setServerError] = useState(false);

    useEffect(()=>{
        try {
            apiRequest.get('/archival_user_api/archival_analysis',{headers:{
              get_archanalysis_api:process.env.REACT_APP_GET_ARCHANALYSIS_API,
                Authorization:`Bearer ${token}`
            }}).then((res)=>{
                setArchivalAnalyisis(res.data);
            }).catch((error)=>{
                if(error?.response?.status ===500){
                    setServerError(true)
                }
            })
            
        } catch (error) {
            setServerError(true)
            
        }
    },[token])

    const genderArchivalCharOptions = archivalChartFun([
        { value: archivalAnalysis ? archivalAnalysis?.maleArchival:0, name: "Male" },
        { value: archivalAnalysis ? archivalAnalysis?.femaleArchvial:0, name: "Female" },
    
      ]);
          
      const statusAdminCharOptions = archivalChartFun([
        { value: archivalAnalysis ? archivalAnalysis?.activeArchival:0, name: "Active" },
        { value: archivalAnalysis ? archivalAnalysis?.inactiveArchival:0, name: "Inactive" },
    
      ]);
    


    if(serverError) return <ServerError />

    
  return (
    <div className='w-[100%] my-[30px] grid grid-cols-2 gap-[10px]'>
        <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>
                <span className='font-bold text-[#0C73B8] max-lg2:text-[14px]'>Archival Gender</span>
           
            <div className="w-[100%]">
              <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
                <ReactEcharts option={genderArchivalCharOptions} />
                {/* <span className='font-bold text-[#1B3E74]'>No Available Data</span> */}
              </div>
        
          </div>

        </div>
       
        <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>

        <span className='font-bold text-[#0C73B8] max-lg2:text-[14px]'>Archival Status</span>
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

export default ArchivalChart
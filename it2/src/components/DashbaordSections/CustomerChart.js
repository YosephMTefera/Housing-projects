import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import apiRequest from '../../utils/request';
import { customerChartFun } from '../../utils/data';
import ServerError from '../ServerError';

function CustomerChart() {
    const token = sessionStorage.getItem('tID');
    const [customerAnalysis,setCustomerAnalyisis] = useState({});
    const [serverError,setServerError] = useState(false);
       
    useEffect(()=>{
        try {
            apiRequest.get('/customer_user_api/get_customer_analysis',{headers:{
                get_cuserslist_api:process.env.REACT_APP_GET_CUSERSLIST_API,
                Authorization:`Bearer ${token}`
            }}).then((res)=>{
                setCustomerAnalyisis(res.data);
            }).catch((error)=>{
                if(error?.response?.status ===500){
                    setServerError(true)
                }
            })
            
        } catch (error) {
       
            setServerError(true)
            
        }
    },[token])


      
  
    
    const genderCustomerCharOptions = customerChartFun([
        { value: customerAnalysis ? customerAnalysis?.maleUsers:0, name: "Male" },
        { value: customerAnalysis ?  customerAnalysis?.femaleUsers:0, name: "Female" },
    
      ]);
          
      const statusCustomerCharOptions = customerChartFun([
        { value: customerAnalysis ? customerAnalysis?.activeUsers:0, name: "Active" },
        { value: customerAnalysis ? customerAnalysis?.inactiveUsers:0, name: "Inactive" },
    
      ]);

      if(serverError) return <ServerError />
  return (
    <div className='w-[100%] my-[30px] grid grid-cols-2 gap-[10px]'>
    
        <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>
                <span className='font-bold text-[#0C73B8] max-lg2:text-[14px]'>Customer Gender</span>
           
            <div className="w-[100%]">
              <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
                <ReactEcharts option={genderCustomerCharOptions} />
                {/* <span className='font-bold text-[#1B3E74]'>No Available Data</span> */}
              </div>
        
          </div>

        </div>
        <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>

        <span className='font-bold text-[#0C73B8] max-lg2:text-[14px]'>Customer Status</span>
<div className="w-[100%]">
  <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
    <ReactEcharts option={statusCustomerCharOptions} />
    {/* <span className='font-bold text-[#1B3E74]'>No Available Data</span> */}
  </div>

</div>

</div>
    </div>
  )
}

export default CustomerChart
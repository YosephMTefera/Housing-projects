import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import apiRequest from '../../utils/request';
import ServerError from '../ServerError';
import Loading from '../Loading';
import { chartFun } from '../../utils/data';
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";


function CaseCharts() {
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state)=>state.translation);
  const [caseListAnalysis, setCaseListAnalysis] = useState([]);
  const [createdByAnalysis,setCreatedByAnalysis] = useState({})
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const adminCustomers =translationState?.lan==="En" ? language?.customers[0] : language?.customers[1]

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get("/customer_case_api/get_caselist_analysis", {
          headers: {
            get_clanalysis_api: process.env.REACT_APP_GET_CLANALYSIS_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setCaseListAnalysis(res.data);
        
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  }, [token]);

  
  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get("/customer_case_api/get_case_create_by", {
          headers: {
            get_casreatedby_api: process.env.REACT_APP_GET_CASREATEDBY_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setCreatedByAnalysis(res.data);
       
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  }, [token]);

  const genderAdminCharOptions = chartFun([
    {
      value: createdByAnalysis ? createdByAnalysis?.windowsCreated : 0,
      name: translationState?.lan==="En" ? language?.windowServiceCustomers[0] : language?.windowServiceCustomers[1],
    },
    {
      value: createdByAnalysis ? createdByAnalysis?.customerCreated : 0,
      name: translationState?.lan==="En" ? language?.onlineCustomers[0] : language?.onlineCustomers[1],
    },
  ],adminCustomers);
 

  if(serverError) return <ServerError />

  return (
    loading ? <Loading addtionalStyle={"flex justify-center items-center my-[30px]"}/> :
    <div className="w-[100%] my-[20px] grid grid-cols-2 gap-[10px]">
      <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>
        <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
        {translationState?.lan ==="En" && language?.frequentlyFilledCaseRequest[0]}
        {translationState?.lan ==="Am" && language?.frequentlyFilledCaseRequest[1]}
        </span>
        <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col  overflow-y-auto hide-scroll-bar">
          {caseListAnalysis?.length ===0 ? <div className='h-[100%] flex justify-center items-center'>
                <span className='text-[14px] font-bold'>
                {translationState?.lan ==="En" && language?.nofilledCaseRequest[0]}
                {translationState?.lan ==="Am" && language?.nofilledCaseRequest[1]}
                </span>
              </div>:  <div className='w-[90%] mx-auto my-[20px] flex flex-col gap-[10px]'>
            <div className='w-[100%] flex justify-between items-center text-[14px] font-bold'>
              <span>#</span>
              <span>{translationState?.lan ==="En" && language?.caseRequest[0]}
              {translationState?.lan ==="Am" && language?.caseRequest[1]}</span>
   
              <span>
              {translationState?.lan ==="En" && language?.percentage[0]}
              {translationState?.lan ==="Am" && language?.percentage[1]}
              </span>
            </div>
            <div className="w-[100%]  flex flex-col justify-center items-center gap-[20px] text-gray-500 text-[12px] max-lg2:text-[10px]">
              {caseListAnalysis?.slice(0,5)?.map((cr,index)=>{
                return <div key={index}  className="w-[100%] border-b py-2 flex justify-between items-center gap-[5px]">
                    <span>{index + 1}</span>
                    <span>
                    {translationState?.lan ==="En" && cr?.name_en}
                    {translationState?.lan ==="Am" && cr?.name_am}
                    </span>
                  
                    <span>{cr?.percentage}%</span>
                </div>
              })}

            </div>
           </div>}
         
          </div>

       
      </div>
      <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>
        <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
        {translationState?.lan ==="En" && language?.customerAnalysis[0]}
        {translationState?.lan ==="Am" && language?.customerAnalysis[1]}
        </span>

        <div className="w-[100%]">
          <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
            <ReactEcharts option={genderAdminCharOptions} />
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default CaseCharts